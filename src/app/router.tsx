import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { LoginPage } from "../pages/Login/LoginPage";
import { StudentPage } from "../pages/Student/StudentPage";
import { AdminPage } from "../pages/Admin/AdminPage";
import { NotFoundPage } from "../pages/errors/NotFoundPage";
import { StudentTestPage } from "../pages/Student/StudentTestPage";
import { StudentRunTests } from "../pages/Student/StudentRunTests";
import { StudentLayout } from "../layouts/StudentLayout";
import { AdminLayout } from "../layouts/AdminLayout";
import { StudentProfilePage } from "../components/StudentProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "student",
        element: <StudentLayout />,
        children: [
          { index: true, element: <StudentPage /> },
          { path: "tests", element: <StudentTestPage /> },
          { path: "tests/:id", element: <StudentRunTests /> },
          { path: "statistics", element: <h2>statistics</h2> },
          { path: "profile", element: <StudentProfilePage /> },
        ],
      },
      { path: "login", element: <LoginPage /> },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminPage /> },
          { path: "settings", element: <h2>ADMIN SETTINGS</h2> },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
