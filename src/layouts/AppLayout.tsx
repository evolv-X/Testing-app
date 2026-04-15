import { Outlet } from "react-router-dom";
import { NavMenu } from "../components/NavMenu";
import { StoreProvider } from "../pages/Store/StoreProvider";
import ModalHost from "../components/ui/ModalHost";

export function AppLayout() {
  return (
    <>
      <main>
        <NavMenu></NavMenu>
        <StoreProvider>
          <Outlet />
          <ModalHost />
        </StoreProvider>
      </main>
      <footer>2026</footer>
    </>
  );
}
