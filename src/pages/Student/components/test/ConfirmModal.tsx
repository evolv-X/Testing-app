import { Modal } from '../../../../components/Modal';

interface ConfirmModalProps {
  open: boolean;
  onClose: (v: boolean) => void;
  onSuccess: () => void;
  title: string;
}

export function ConfirmModal(props: ConfirmModalProps) {
    const { open, onClose, onSuccess, title } = props;
    
  return (
    <Modal
          title={title}
          open={open}
          onClose={() => onClose(false)}
          disabled={false}
          onSubmit={() => onSuccess()}
          confirmLabel={"Завершить"}
        >
    </Modal>
  )
}
