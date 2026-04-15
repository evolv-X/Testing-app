import { makeAutoObservable } from "mobx";
import type { RootStore } from "./rootstore/rootStore";
import type { NavigateFunction } from "react-router-dom";

export class TestRunPageVM {
  confirmModal: boolean = false;
  rootStore: RootStore;
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
}
