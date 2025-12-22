import { Modal } from "./Modal";
import styled from "@emotion/styled";
import { PasswordInput } from "./PasswordInput";

interface ChangeModalPassProps {
  open: boolean;
  onClose: (v: boolean) => void;
}

const ChildContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export default function ChangeModalPass(props: ChangeModalPassProps) {
  const { open, onClose } = props;
  return (
    <Modal title="Сменить пароль" open={open} onClose={(v) => onClose(v)}>
      <ChildContainer>
        <PasswordInput label="Новый пароль" />
        <PasswordInput label="Повторите пароль" />
      </ChildContainer>
    </Modal>
  );
}
