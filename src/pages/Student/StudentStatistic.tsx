import { observer } from "mobx-react-lite";
import { useStore } from "../Store/useStore";
import { Modal } from "../../components/Modal";

export const StudentStatistic = observer(() => {
  // const counter = useMemo(() => new Counter(), []);
  const { value, increment, decrement, reset } = useStore().counterStore;
  const { modalStore } = useStore();

  return (
    <div>
      StudentStatistic
      <div>{value}</div>
      <button onClick={() => increment()}>+</button>
      <button onClick={() => decrement()}>-</button>
      <button onClick={() => reset()}>reset</button>
      <button
        onClick={() => {
          modalStore.setTitle("Пример модалки из стора");
          modalStore.setSubmit(() => {
            modalStore.closeModal();
          });
          modalStore.openModal();
        }}
      >
        Открыть модальное окно
      </button>
      <Modal
        title={modalStore.title}
        open={modalStore.open}
        onClose={() => modalStore.closeModal()}
        disabled={modalStore.disabled}
        onSubmit={modalStore.onSubmit}
        cancelLabel={modalStore.cancelLabel}
        confirmLabel={modalStore.confirmLabel}
      >
        <p>
          Это пример контента модального окна, которое управляется через
          ModalStore.
        </p>
      </Modal>
    </div>
  );
});
