import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getToken } from "../../helpers";
import { loginService } from "../../services";

export const AuthContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (!!token) {
      const body = { token: token };
      loginService({ setUser, setIsAuth, setIsLoading, body });
    } else {
      setTimeout(() => {
        setIsAuth(false);
        setIsLoading(false);
      }, 1000);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuth, isLoading, user, setIsAuth, setUser, setIsLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
