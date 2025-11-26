import { NavLink } from "react-router-dom";

export function NavMenu() {
  return (
    <nav>
      <NavLink
        className={({ isActive }) => (isActive ? "active" : "")}
        to="/login"
      >
        Войти
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "active" : "")}
        to="/student"
      >
        Студент
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "active" : "")}
        to="/admin"
        state={{ some: "value", filter: "compleated", a: "bbb" }}
      >
        Админ
      </NavLink>
    </nav>
  );
}
