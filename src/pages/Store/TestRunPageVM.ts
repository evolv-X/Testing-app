import { makeAutoObservable, reaction } from "mobx";
import { createElement } from "react";
import type { RootStore } from "./rootstore/rootStore";
import type { NavigateFunction } from "react-router-dom";
import ChangePassForm from "../../components/ChangePassForm";

export class TestRunPageVM {
  rootStore: RootStore;
  private changePassDisposer: (() => void) | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.rootStore = rootStore;
  }

  async init(testId: number) {
    await this.rootStore.testRunStore.start(testId);
  }

  submit(navigate: NavigateFunction) {
    this.store.submit(navigate);
  }

  get finishTitle() {
    if (this.store.allAnswered) {
      return "Хотите закончить тестирование?";
    }
    return `Не все задания выполнены. Вы уверены что хотите закончить? ${this.store.answeredCount}/${this.store.totalCount}`;
  }

  get store() {
    return this.rootStore.testRunStore;
  }

  get modalStore() {
    return this.rootStore.modalStore;
  }

  get changePassStore() {
    return this.rootStore.changePassStore;
  }

  requestFinish(navigate: NavigateFunction) {
    this.modalStore.setTitle(this.finishTitle);
    this.modalStore.setCancelLabel("Отменить");
    this.modalStore.setConfirmLabel("Завершить");
    this.modalStore.setDisabled(false);
    this.modalStore.openModal();
    this.modalStore.setSubmit(() => {
      this.modalStore.closeModal();
      this.submit(navigate);
    });
    this.modalStore.setOnClose(() => {
      this.modalStore.closeModal();
    });
  }

  requestChangePass() {
    const cps = this.changePassStore;
    cps.reset();

    this.modalStore.setTitle("Сменить пароль");
    this.modalStore.setCancelLabel("Отменить");
    this.modalStore.setConfirmLabel("Подтвердить");
    this.modalStore.setChildren(createElement(ChangePassForm, { store: cps }));

    // React on formValid changes to keep the button disabled state in sync
    this.changePassDisposer?.();
    this.changePassDisposer = reaction(
      () => cps.formValid,
      (valid) => this.modalStore.setDisabled(!valid || cps.submitting),
      { fireImmediately: true },
    );

    this.modalStore.setSubmit(() => {
      cps.submit(() => {
        this.changePassDisposer?.();
        this.modalStore.closeModal();
      });
    });

    this.modalStore.setOnClose(() => {
      this.changePassDisposer?.();
      cps.reset();
      this.modalStore.closeModal();
    });

    this.modalStore.openModal();
  }
}

