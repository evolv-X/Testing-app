import { Modal } from "./Modal";
import styled from "@emotion/styled";
import { PasswordInput } from "./PasswordInput";
import { useState } from "react";

interface ChangeModalPassProps {
  open: boolean;
  onClose: (v: boolean) => void;
  onSuccess: () => void;
}

const USER_PASS = "passworD123$";

const ChildContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const TextError = styled.pre`
  font-size: 14px;
  color: red;
`;

export default function ChangeModalPass(props: ChangeModalPassProps) {
  const { open, onClose, onSuccess } = props;
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [serverErr, setServerErr] = useState("");
  const [submitting, setSubmitting] = useState(false);
  function validatePassword(pw: string) {
    const errors: string[] = [];
    if (pw.length <= 8) errors.push("Минимум 8 символов");
    if (!/^.*[a-z].*$/.test(pw)) errors.push("Хотя бы одна строчная буква");
    if (!/[A-Z]/.test(pw)) errors.push("Хотя бы одна заглавная буква");
    if (!/[@$!%*?&~]/.test(pw)) errors.push("Хотя бы один спецсимвол");
    if (!/[0-9]/.test(pw)) errors.push("Хотя бы одна цифра");
    if (pw === USER_PASS)
      errors.push(
        "Пароль не должен содержать последовательность из старого пароля",
      );
    return errors;
  }

  const pwErr = validatePassword(pw1);
  // console.log(pwErr);
  // const  проверка на одинаковость паролей инпута
  const matchErr = pw1 && pw2 && pw1 === pw2 ? "" : "Пароли не совпадают";
  const formValid = pw1 !== "" && pw2 !== "" && pwErr.length === 0 && !matchErr;
  // console.log(formValid);

  function sendPassword(newPw: string) {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (newPw.includes(USER_PASS)) reject(new Error("Whoops!"));
        else {
          resolve();
          console.log("Пароль изменен");
        }
      }, 500);
    });
  }

  async function onSubmit() {
    console.log("нажали");
    console.log(formValid);

    if (!formValid) return;

    try {
      await sendPassword(pw1);
      setSubmitting(true);
      onClose(false);
      onSuccess();
      console.log("tcnm");
    } catch (error: any) {
      setServerErr(error?.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal
      title="Сменить пароль"
      open={open}
      onClose={() => onClose(false)}
      disabled={!formValid || submitting}
      onSubmit={() => onSubmit()}
    >
      <ChildContainer>
        <PasswordInput
          label="Новый пароль"
          type="password"
          onChange={setPw1}
          value={pw1}
        />
        <PasswordInput
          label="Повторите пароль"
          type="password"
          onChange={setPw2}
          value={pw2}
        />
      </ChildContainer>
      <TextError style={{ color: "red" }}>{pwErr.join(`\n`)}</TextError>
      <TextError style={{ color: "red" }}>{matchErr}</TextError>
      <TextError style={{ color: "red" }}>{serverErr}</TextError>
    </Modal>
  );
}
