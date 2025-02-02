import { StrictMode } from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import "./assets/custom-scrollbar.css";
import LoginPage from "./pages/login/login.tsx";
import Layout from "./components/layout.tsx";
import GenerateQrPage from "./pages/qr-management/generate-qr.tsx";
import ScanQr from "./pages/qr-management/scan-qr.tsx";
import { ThemeProvider } from "@/components/theme-provider";
import ScanQrV2 from "./pages/qr-management/scan-qr-v2.tsx";
import ScanInPage from "./pages/template/scan-in.tsx";
import MtrlManagementPage from "./pages/template/mtrl-management.tsx";
import MtrlManagementV2Page from "./pages/template/mtrl-mamagement-v2.tsx";
import PrintQrPage from "./pages/template/print-qr.tsx";
import LocationManagementPage from "./pages/template/location-management.tsx";
import BorrowReturnManagementPage from "./pages/template/borrow-return-management.tsx";
import BorrowReturnHistoryManagement from "./pages/template/borrow-return-history-management.tsx";
import MtrlInforPage from "./pages/template/mtrl-infor.tsx";

// Tạo một QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 phút - Thời gian dữ liệu được coi là "fresh"
      refetchOnWindowFocus: false, // Không tự động refetch khi focus lại window
      retry: 2, // Thử lại 2 lần nếu fetch thất bại
    },
  },
});

const router = createBrowserRouter([
  {
    index: true,
    path: "",
    element: <Navigate to="/admin/login" />,
  },
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
      { path: "scan-in", element: <ScanInPage /> }, //-
      { path: "mtrl-management", element: <MtrlManagementPage /> },
      { path: "mtrl-management-v2", element: <MtrlManagementV2Page /> }, //-
      { path: "print-qr", element: <PrintQrPage /> }, //-
      { path: "location-management", element: <LocationManagementPage /> }, //-
      {
        path: "borrow-return-management",
        element: <BorrowReturnManagementPage />,
      }, //-
      {
        path: "borrow-return-history-management",
        element: <BorrowReturnHistoryManagement />,
      },
      { path: "mtrl-infor", element: <MtrlInforPage /> }, //-
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </ThemeProvider>
  //   <App />
  // </StrictMode>
);
