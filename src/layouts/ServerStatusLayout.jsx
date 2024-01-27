import { Navigate, Outlet } from "react-router-dom";
import { FullPageLoader } from "../components/FullPageLoader";
import { useServerStatusContex } from "../context/server_status/ServerStatusContex";

export const ServerStatusLayout = () => {
  const { serverIsAlive } = useServerStatusContex();
  if (serverIsAlive === null) {
    return <FullPageLoader />;
  }
  return serverIsAlive ? <Outlet /> : <Navigate to={"/StoreError"} />;
};
