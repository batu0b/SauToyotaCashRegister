import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import Settigns from "../pages/Settigns";
import { ServerStatusLayout } from "../layouts/ServerStatusLayout";
import StoreErrorPage from "../pages/StoreErrorPage";

export const PageRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<ServerStatusLayout />}>
          <Route index path="/" element={<HomePage />} />
        </Route>
        <Route path="/settings" element={<Settigns />} />
        <Route path="/StoreError" element={<StoreErrorPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/auth" element={<AuthPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
