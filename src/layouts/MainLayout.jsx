import { Navigate, Outlet } from "react-router-dom";
import { useAuthcontext } from "../context/auth/AuthContext";

export const MainLayout = () => {
  //TODO loader ekle
  const { isAuth } = useAuthcontext();
  if (isAuth === null) {
    return <h1>...</h1>;
  }
  return isAuth ? <Outlet /> : <Navigate to={"/auth"} />;
};
