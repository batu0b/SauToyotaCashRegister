import { useContext } from "react";
import { createContext } from "react";

export const AuthContext = createContext({
  isAuth: false,
  setIsAuth: () => {},
  isLoading: true,
  setIsLoading: () => {},
  user: null,
  setUser: () => {},
});

export const useAuthcontext = () => useContext(AuthContext);
