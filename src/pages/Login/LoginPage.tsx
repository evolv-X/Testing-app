import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();

  function hendleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(e);
    navigate("/student");
  }

  return (
    <div>
      <h2>Добро пожаловать!</h2>
      <form onSubmit={(e) => hendleSubmit(e)}>
        <div>
          <label htmlFor="email">Логин</label>
          <input id="email" type="email" />
        </div>

        <div>
          <label htmlFor="password">Пароль</label>
          <input id="password" type="password" />
        </div>

        <div>
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Запомнить меня</label>
        </div>

        <button type="submit">Войти</button>
      </form>
    </div>
  );
}
