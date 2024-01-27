import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/auth/AuthContext";
import { FullPageLoader } from "../components/FullPageLoader";
import { AppDrawer } from "../components/app_bar/AppDrawer";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";

export const MainLayout = () => {
  const { isAuth } = useAuthContext();
  const { breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.down("md"));
  if (isAuth === null) {
    return <FullPageLoader />;
  }
  return isAuth ? (
    <Box sx={{ display: matches ? null : "flex", overflow: "hidden" }}>
      <AppDrawer matches={matches} />
      <Outlet />
    </Box>
  ) : (
    <Navigate to={"/auth"} />
  );
};
