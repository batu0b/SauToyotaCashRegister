import { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  //TODO login islemini ve token kontrolunu yap

  return (
    <AuthContext.Provider
      value={{ isAuth, isLoading, user, setIsAuth, setUser, setIsLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
