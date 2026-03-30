import { Counter } from "../counter";
import { TestsCatalogStore } from "../domains/tests/testsCatalogStore";

export class RootStore {
  counterStore: Counter;
  testsCatalogStore: TestsCatalogStore;

  constructor() {
    this.counterStore = new Counter();
    this.testsCatalogStore = new TestsCatalogStore();
  }
}

export const rootStore = new RootStore();
