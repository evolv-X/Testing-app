import { makeAutoObservable } from "mobx";

export class Counter {
  private _value: number;

  constructor() {
    this._value = 0;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get value() {
    return this._value;
  }

  increment() {
    this._value++;
  }

  decrement() {
    this._value--;
  }

  reset() {
    this._value = 0;
  }
}
