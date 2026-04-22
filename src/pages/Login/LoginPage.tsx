import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import styled from "@emotion/styled";
import { useStore } from "../Store/useStore";
import { PasswordInput } from "../../components/PasswordInput";

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(p) => p.theme.colors.background};
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 440px;
  padding: 32px 24px;
  background-color: #fff;
  border: 1px solid #dde2e4;
  border-radius: ${(p) => p.theme.radius.md};
  gap: 18px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  color: ${(p) => p.theme.colors.text};
`;

const ErrorText = styled.pre`
  font-size: 14px;
  color: red;
  margin: 0;
  white-space: pre-wrap;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Field = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${(p) => p.theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 0.5px solid #09090b;
  border-radius: ${(p) => p.theme.radius.md};
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    background: #e8f5ff;
    border-color: #4094f7;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #4094f7;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 16px;
  width: 100%;
  border-radius: ${(p) => p.theme.radius.md};
  border: none;
  background: #4094f7;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #2d7de0;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const LoginPage = observer(() => {
  const { authStore } = useStore();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  // Если пользователь уже авторизован — не показываем логин, а сразу кидаем в систему
  if (authStore.isAuthorized) {
    return <Navigate to="/student" replace />;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!login || !password) return;

    await authStore.login({ login, password }, remember);
  }

  return (
    <PageWrapper>
      <Card>
        <Title>Добро пожаловать!</Title>

        {authStore.error && <ErrorText>{authStore.error}</ErrorText>}

        <Form onSubmit={handleSubmit}>
          <Field>
            <Label htmlFor="login">Логин</Label>
            <Input
              id="login"
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              disabled={authStore.isLoading}
              required
            />
          </Field>

          <PasswordInput
            label="Пароль"
            value={password}
            onChange={setPassword}
          />

          <CheckboxRow>
            <Checkbox
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              disabled={authStore.isLoading}
            />
            <Label htmlFor="remember">Запомнить меня</Label>
          </CheckboxRow>

          <SubmitButton type="submit" disabled={authStore.isLoading}>
            {authStore.isLoading ? "Вход..." : "Войти"}
          </SubmitButton>
        </Form>
      </Card>
    </PageWrapper>
  );
});
