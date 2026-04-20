import { Navigate, Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../pages/Store/useStore";

export const ProtectedRoute = observer(() => {
  const store = useStore();

  if (!store.authStore.isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
});
