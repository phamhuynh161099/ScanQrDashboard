import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks.tsx";
import "./assets/custom-scrollbar.css";
import Layout from "./components/layout.tsx";
import "./index.css";
import LoginPage from "./pages/login/login.tsx";
import GenerateQrPage from "./pages/qr-management/generate-qr.tsx";
import ScanQrV2 from "./pages/qr-management/scan-qr-v2.tsx";
import ScanQr from "./pages/qr-management/scan-qr.tsx";
import ScanInPage from "./pages/scan-in/scan-in.tsx";
import ScanInforPage from "./pages/scan-infor/scan-infor.tsx";
import BorrowReturnHistoryManagement from "./pages/template/borrow-return-history-management.tsx";
import BorrowReturnManagementPage from "./pages/template/borrow-return-management.tsx";
import LocationManagementPage from "./pages/template/location-management.tsx";
import MtrlManagementV2Page from "./pages/template/mtrl-mamagement-v2.tsx";
import MtrlManagementPage from "./pages/template/mtrl-management.tsx";
import PrintQrPage from "./pages/template/print-qr.tsx";
import { LocalStorageEventTarget } from "./utils/auth.ts";
import { useEffect } from "react";
import {
  setAccessToken,
  setProfile,
  setRefreshToken,
} from "./features/auth/authSlice.tsx";

function App() {
  const dispatch = useAppDispatch();
  /**
   * Router need login success to access
   */
  function ProtectedRoute() {
    const profile = useAppSelector((state) => state.auth.profile);
    return Boolean(profile) ? <Outlet /> : <Navigate to="/admin/login" />;
  }

  function RejectedRoute() {
    const profile = useAppSelector((state) => state.auth.profile);
    return !Boolean(profile) ? <Outlet /> : <Navigate to="/admin/scan-infor" />;
  }

  const router = createBrowserRouter([
    {
      index: true,
      path: "",
      element: <Navigate to="/admin/login" />,
    },
    // Router dont need login success
    {
      path: "/admin/login",
      element: <RejectedRoute />,
      children: [
        {
          path: "",
          element: <LoginPage />,
        },
      ],
    },
    // Router must be login success
    {
      path: "/admin",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <Layout />,
          children: [
            { path: "generate-qr", element: <GenerateQrPage /> },
            { path: "scan-qr", element: <ScanQr /> },
            { path: "scan-qr-v2", element: <ScanQrV2 /> },
            { path: "scan-in", element: <ScanInPage /> }, //-
            { path: "mtrl-management", element: <MtrlManagementPage /> },
            { path: "mtrl-management-v2", element: <MtrlManagementV2Page /> }, //-
            { path: "print-qr", element: <PrintQrPage /> }, //-
            {
              path: "location-management",
              element: <LocationManagementPage />,
            }, //-
            {
              path: "borrow-return-management",
              element: <BorrowReturnManagementPage />,
            },
            {
              path: "borrow-return-history-management",
              element: <BorrowReturnHistoryManagement />,
            },
            { path: "scan-infor", element: <ScanInforPage /> }, //-
          ],
        },
      ],
    },
  ]);

  const reset = () => {
    dispatch(setAccessToken(""));
    dispatch(setRefreshToken(""));
    dispatch(setProfile(""));
  };

  useEffect(() => {
    LocalStorageEventTarget.addEventListener("clearLS", reset);
    return () => {
      LocalStorageEventTarget.removeEventListener("clearLS", reset);
    };
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
