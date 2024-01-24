import { Navigate, Outlet } from "react-router-dom";
import { useAuthcontext } from "../context/auth/AuthContext";

export const AuthLayout = () => {
  //TODO loader ekle
  const { isAuth } = useAuthcontext();
  if (isAuth === null) {
    return <h1>...</h1>;
  }
  return isAuth ? <Navigate to={"/"} /> : <Outlet />;
};
