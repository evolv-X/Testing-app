import { makeAutoObservable, runInAction } from "mobx";

const USER_PASS = "passworD123$";

export class ChangePassStore {
  pw1 = "";
  pw2 = "";
  serverErr = "";
  submitting = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setPw1(value: string) {
    this.pw1 = value;
    this.serverErr = "";
  }

  setPw2(value: string) {
    this.pw2 = value;
    this.serverErr = "";
  }

  get pwErrors(): string[] {
    const errors: string[] = [];
    if (this.pw1.length <= 8) errors.push("Минимум 8 символов");
    if (!/^.*[a-z].*$/.test(this.pw1)) errors.push("Хотя бы одна строчная буква");
    if (!/[A-Z]/.test(this.pw1)) errors.push("Хотя бы одна заглавная буква");
    if (!/[@$!%*?&~]/.test(this.pw1)) errors.push("Хотя бы один спецсимвол");
    if (!/[0-9]/.test(this.pw1)) errors.push("Хотя бы одна цифра");
    if (this.pw1 === USER_PASS)
      errors.push("Пароль не должен содержать последовательность из старого пароля");
    return errors;
  }

  get matchErr(): string {
    if (!this.pw1 || !this.pw2) return "";
    return this.pw1 === this.pw2 ? "" : "Пароли не совпадают";
  }

  get formValid(): boolean {
    return (
      this.pw1 !== "" &&
      this.pw2 !== "" &&
      this.pwErrors.length === 0 &&
      !this.matchErr
    );
  }

  reset() {
    this.pw1 = "";
    this.pw2 = "";
    this.serverErr = "";
    this.submitting = false;
  }

  private sendPassword(newPw: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (newPw.includes(USER_PASS)) reject(new Error("Whoops!"));
        else {
          resolve();
          console.log("Пароль изменен");
        }
      }, 500);
    });
  }

  async submit(onSuccess: () => void) {
    if (!this.formValid) return;

    this.submitting = true;
    try {
      await this.sendPassword(this.pw1);
      runInAction(() => {
        this.submitting = false;
      });
      onSuccess();
    } catch (error: any) {
      runInAction(() => {
        this.serverErr = error?.message ?? "Ошибка сервера";
        this.submitting = false;
      });
    }
  }
}
