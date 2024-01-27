import { useContext } from "react";
import { createContext } from "react";

export const AuthContext = createContext({
  isAuth: false,
  setIsAuth: () => {},
  isLoading: false,
  setIsLoading: () => {},
  user: null,
  setUser: () => {},
  logOut: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
