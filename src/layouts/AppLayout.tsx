import { Outlet } from "react-router-dom";
import { NavMenu } from "../components/NavMenu";

export function AppLayout() {
  return (
    <>
      <main>
        <NavMenu></NavMenu>
        <Outlet />
      </main>
      <footer>2025</footer>
    </>
  );
}
