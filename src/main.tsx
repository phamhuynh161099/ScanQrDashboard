import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/login/login.tsx";
import Layout from "./components/layout.tsx";
import GenerateQrPage from "./pages/qr-management/generate-qr.tsx";
import ScanQr from "./pages/qr-management/scan-qr.tsx";
import { ThemeProvider } from "@/components/theme-provider";
import ScanQrV2 from "./pages/qr-management/scan-qr-v2.tsx";
import ScanInPage from "./pages/template/scan-in.tsx";

const router = createBrowserRouter([
  {
    path: "/admin/login",
    element: (
      <LoginPage />
      // <NoAuthMiddleware>
      //   <Login />
      // </NoAuthMiddleware>
    ),
  },
  {
    path: "/admin",
    element: (
      <Layout />
      // <AuthMiddleware>
      //   <Layout />
      // </AuthMiddleware>
    ),
    children: [
      { path: "generate-qr", element: <GenerateQrPage /> },
      { path: "scan-qr", element: <ScanQr /> },
      { path: "scan-qr-v2", element: <ScanQrV2 /> },
      { path: "scan-in", element: <ScanInPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider router={router} />
  </ThemeProvider>

  //   <App />
  // </StrictMode>
);
