import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { LoginPage } from "../pages/Login/LoginPage";
import { StudentPage } from "../pages/Student/StudentPage";
import { AdminPage } from "../pages/Admin/AdminPage";
import { NotFoundPage } from "../pages/errors/NotFoundPage";
import { StudentTestPage } from "../pages/Student/StudentTestPage";
import { StudentTest } from "../pages/Student/StudentTest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "student/test/:id", element: <StudentTestPage /> },
      { path: "student/tests", element: <StudentTest /> },
      { path: "login", element: <LoginPage /> },
      { path: "student", element: <StudentPage /> },
      { path: "admin", element: <AdminPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
