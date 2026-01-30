import React, { useEffect } from "react";
import { ProfileIcon } from "../../icons/icons";
import styled from "@emotion/styled";

const Notice = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: flex;
  z-index: 10;
  padding: 15px 10px;
  background-color: #d7edff;
  border-radius: 15px;
  display: flex;
  gap: 10px;
  align-items: center;
  color: #0e73f6;
  min-width: 320px;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Close = styled.div`
  position: absolute;
  top: 8.67px;
  right: 8.67px;
  cursor: pointer;
`;

type ToastProps = {
  open: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
  type: "success" | "error" | "info";
};

export function Toast({ open, message, onClose, duration=3000, type }: ToastProps) {
  
  useEffect (()=>{
    if (!open) return;
    const t = setTimeout(()=> {
      onClose();
    }, duration);
    return () => clearTimeout(t);
  }, [open, onClose, duration])

  if (!open) return null;
  
  return (
    <Notice>
      <Content>
        <ProfileIcon />
        <p>{message}</p>
      </Content>
      <Close aria-label="Close">X</Close>
    </Notice>
  );
}
