import { makeAutoObservable, runInAction } from "mobx";

export class ModalStore {
  title: string;
  open: boolean;
  onClose: (v: boolean) => void;
  children?: React.ReactNode;
  disabled: boolean;
  onSubmit: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
  constructor() {
    this.title = "Модальное окно";
    this.open = false;
    this.onClose = () => {};
    this.disabled = false;
    this.onSubmit = () => {};
    this.cancelLabel = "Отменить";
    this.confirmLabel = "Подтвердить";
    makeAutoObservable(this, {}, { autoBind: true });
  }

  openModal(template?: string) {
    if (template === "changePass") {
      this.title = "Сменить пароль";
      this.cancelLabel = "Отменить";
      this.confirmLabel = "Подтвердить";
    }
    if (template === "confirmEnd") {
      this.title = "Хотите закончить тестирование?";
      this.cancelLabel = "Отменить";
      this.confirmLabel = "Завершить";
    }
    this.open = true;
  }

  closeModal() {
    this.open = false;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setDisabled(disabled: boolean) {
    this.disabled = disabled;
  }

  setSubmit(onSubmit: () => void) {
    this.onSubmit = onSubmit;
  }

  setCancelLabel(cancelLabel: string) {
    this.cancelLabel = cancelLabel;
  }

  setConfirmLabel(confirmLabel: string) {
    this.confirmLabel = confirmLabel;
  }

  setOnClose(onClose: () => void) {
    this.onClose = onClose;
  }
}
