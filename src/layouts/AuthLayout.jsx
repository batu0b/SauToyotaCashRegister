import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/auth/AuthContext";
import { FullPageLoader } from "../components/FullPageLoader";

export const AuthLayout = () => {
  const { isAuth } = useAuthContext();
  if (isAuth === null) {
    return <FullPageLoader />;
  }
  return isAuth ? <Navigate to={"/"} /> : <Outlet />;
};
