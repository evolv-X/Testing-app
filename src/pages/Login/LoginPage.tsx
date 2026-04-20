import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useStore } from "../Store/useStore";

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
    <div>
      <h2>Добро пожаловать!</h2>
      
      {authStore.error && (
        <div style={{ color: 'red', marginBottom: '1rem', fontWeight: 500 }}>
          {authStore.error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login">Логин</label>
          <input 
            id="login" 
            type="text" 
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            disabled={authStore.isLoading}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Пароль</label>
          <input 
            id="password" 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={authStore.isLoading}
            required
          />
        </div>

        <div>
          <input 
            type="checkbox" 
            id="remember" 
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            disabled={authStore.isLoading}
          />
          <label htmlFor="remember">Запомнить меня</label>
        </div>

        <button type="submit" disabled={authStore.isLoading}>
          {authStore.isLoading ? "Вход..." : "Войти"}
        </button>
      </form>
    </div>
  );
});
