import styled from "@emotion/styled";
import { useEffect } from "react";

const Overlay = styled.div`
  background: #f5f5f54d;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
`;

const ModalContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 400;
  padding: 24px;
  background-color: #fff;
  border: 1px solid #dde2e4;
  border-radius: ${(p) => p.theme.radius.md};
  gap: 14px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;

  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  line-height: 1;

  color: ${p => p.theme.colors.text};
`;

const Button = styled.button`
  padding: 10px 16px;
  width: 100%;
  border-radius: ${(p) => p.theme.radius.md};
  border: 1px solid #DDE2E4;
  background: transparent;
  color: ${(p) => p.theme.colors.text};
  cursor: pointer;

  &:hover {
    background: #E8F5FF;
    color: #4094F7;
    border: 1px solid #4094F7;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;

interface ModalProps {
  title: string;
  open: boolean;
  onClose: (v: boolean) => void;
  children: React.ReactNode;
}

export function Modal(props: ModalProps) {
  const { open, onClose, title, children } = props;

  useEffect(() => {
    if (!open) return;
    const keyDwn = (e: KeyboardEvent) => {
      e.key === "Escape";
      onClose(false);
    };
    window.addEventListener("keydown", keyDwn);
    return () => window.removeEventListener("keydown", keyDwn);
  }, [open, onClose]);

  if (!open) return;

  console.log(open);
  return (
    <Overlay onClick={() => onClose(false)}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={() => onClose(false)}>×</CloseButton>
        <header>
          <h2>{title}</h2>
        </header>

        <div>{children}</div>
        <ButtonsContainer>
          <Button onClick={() => onClose(false)}>Отменить</Button>
          <Button>Подтвердить</Button>
        </ButtonsContainer>
      </ModalContainer>
    </Overlay>
  );
}
