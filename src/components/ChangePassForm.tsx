import { observer } from "mobx-react-lite";
import styled from "@emotion/styled";
import { PasswordInput } from "./PasswordInput";
import type { ChangePassStore } from "../pages/Store/changePassStore";

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

interface ChangePassFormProps {
  store: ChangePassStore;
}

const ChangePassForm = observer(({ store }: ChangePassFormProps) => {
  return (
    <>
      <ChildContainer>
        <PasswordInput
          label="Новый пароль"
          type="password"
          onChange={(v) => store.setPw1(v)}
          value={store.pw1}
        />
        <PasswordInput
          label="Повторите пароль"
          type="password"
          onChange={(v) => store.setPw2(v)}
          value={store.pw2}
        />
      </ChildContainer>
      <TextError>{store.pwErrors.join("\n")}</TextError>
      <TextError>{store.matchErr}</TextError>
      <TextError>{store.serverErr}</TextError>
    </>
  );
});

export default ChangePassForm;
