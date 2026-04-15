import { observer } from "mobx-react-lite";
import { useStore } from "../../pages/Store/useStore";
import { Modal } from "../Modal";

const ModalHost = observer(() => {
  const {
    open,
    title,
    cancelLabel,
    confirmLabel,
    disabled,
    onSubmit,
    onClose,
    children,
  } = useStore().modalStore;
  return (
    <Modal
      title={title}
      open={open}
      onClose={onClose}
      disabled={disabled}
      onSubmit={onSubmit}
      cancelLabel={cancelLabel}
      confirmLabel={confirmLabel}
      children={children}
    />
  );
});

export default ModalHost;
