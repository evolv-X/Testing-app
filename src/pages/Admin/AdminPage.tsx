import { useLocation } from "react-router-dom";

export function AdminPage() {
  const data = useLocation();

  return (
    <div>
      <h1>Admin page</h1>
      <p>{data.state.some}</p>
    </div>
  );
}
