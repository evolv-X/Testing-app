import { Counter } from "../counter";
import { TestsCatalogStore } from "../domains/tests/testsCatalogStore";
import { TestRunStore } from "../tests/testRunStore";
import { TestRunPageVM } from "../TestRunPageVM";
import { ModalStore } from "../modal/modalStore";
import { ChangePassStore } from "../changePassStore";

export class RootStore {
  counterStore: Counter;
  testsCatalogStore: TestsCatalogStore;
  testRunStore: TestRunStore;
  testRunPageVM: TestRunPageVM;
  modalStore: ModalStore;
  changePassStore: ChangePassStore;

  constructor() {
    this.counterStore = new Counter();
    this.testsCatalogStore = new TestsCatalogStore();
    this.testRunStore = new TestRunStore();
    this.testRunPageVM = new TestRunPageVM(this);
    this.modalStore = new ModalStore();
    this.changePassStore = new ChangePassStore();
  }
}

export const rootStore = new RootStore();
