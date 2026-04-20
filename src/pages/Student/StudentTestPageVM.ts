import { makeAutoObservable } from "mobx";
import type { RootStore } from "../Store/rootstore/rootStore";
import type { Filters } from "../Store/domains/tests/testsCatalogStore";
import type { TestResult } from "../../types/testing";
import type { NavigateFunction } from "react-router-dom";

export class StudentTestPageVM {
  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get store() {
    return this.rootStore.testsCatalogStore;
  }

  get loading() {
    return this.store.isLoading;
  }

  get error() {
    return this.store.error;
  }

  get visibleTests() {
    const { search, tags } = this.store.filters;

    return this.store.publishedTests.filter((test) => {
      const matchesSearch = test.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesTags =
        tags.length === 0 || tags.every((tag) => test.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }

  get lastAttemptByTest() {
    return this.store.latestAttempts;
  }

  get modalStore() {
    return this.rootStore.modalStore;
  }

  onFiltersChange(filters: Filters) {
    this.store.setFilters(filters);
  }

  requestStartTest(test: TestResult, navigate: NavigateFunction) {
    const minutes = test.durationSec ? Math.round(test.durationSec / 60) : null;
    const oneAttempt = test.attemptsAllowed === 1;

    let title: string;
    if (minutes) {
      title = `У Вас ограничение по времени (${minutes} ${this.pluralMinutes(minutes)}). Вы уверены, что хотите начать тест?`;
    } else if (oneAttempt) {
      title = "У Вас одна попытка. Вы уверены, что хотите начать тест?";
    } else {
      // No restrictions — navigate directly
      navigate(`/student/tests/${test.id}`, { state: { durationSec: test.durationSec } });
      return;
    }

    this.modalStore.setTitle(title);
    this.modalStore.setCancelLabel("Отменить");
    this.modalStore.setConfirmLabel("Подтвердить");
    this.modalStore.setDisabled(false);
    this.modalStore.setChildren(undefined);
    this.modalStore.setSubmit(() => {
      this.modalStore.closeModal();
      navigate(`/student/tests/${test.id}`, { state: { durationSec: test.durationSec } });
    });
    this.modalStore.setOnClose(() => {
      this.modalStore.closeModal();
    });
    this.modalStore.openModal();
  }

  private pluralMinutes(n: number): string {
    const last = n % 10;
    const lastTwo = n % 100;
    if (last === 1 && lastTwo !== 11) return "минута";
    if (last >= 2 && last <= 4 && !(lastTwo >= 12 && lastTwo <= 14)) return "минуты";
    return "минут";
  }
}
