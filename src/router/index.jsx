import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import { Box, Toolbar } from "@mui/material";

export const PageRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/settings"
          element={
            <>
              <Toolbar />
              <Box>settings</Box>
            </>
          }
        />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/auth" element={<AuthPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
