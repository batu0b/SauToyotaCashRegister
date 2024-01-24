import { useContext } from "react";
import { createContext } from "react";

export const ServerStatusContex = createContext({
  serverIsAlive: null,
});

export const useServerStatusContex = () => useContext(ServerStatusContex);
