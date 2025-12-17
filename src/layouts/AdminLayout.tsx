import { Outlet } from "react-router-dom";

export function AdminLayout() {
  return (
    <>
      <main>
        <h1>ADMIN page</h1>
        <Outlet />
      </main>
      <footer>2025</footer>
    </>
  );
}
