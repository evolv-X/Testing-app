import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./styles/theme.ts";
import { router } from "./app/router.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router}></RouterProvider>
  </ThemeProvider>
);
