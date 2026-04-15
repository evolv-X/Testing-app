import { Outlet } from "react-router-dom";
import { NavMenu } from "../components/NavMenu";
import { StoreProvider } from "../pages/Store/StoreProvider";

export function AppLayout() {
  return (
    <>
      <main>
        <NavMenu></NavMenu>
        <StoreProvider>
          <Outlet />
          {/* ТУТ ДОЛЖЕН БЫТЬ КОМПОНЕНТ ModalHost ШАГ 8*/}
        </StoreProvider>
      </main>
      <footer>2026</footer>
    </>
  );
}
