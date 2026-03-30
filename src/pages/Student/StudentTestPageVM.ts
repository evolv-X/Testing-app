import { makeAutoObservable } from "mobx";
import type { RootStore } from "../Store/rootstore/rootStore";
import type { Filters } from "../Store/domains/tests/testsCatalogStore";

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

  onFiltersChange(filters: Filters) {
    this.store.setFilters(filters);
  }
}
