import { createContext, useContext } from "react";
import useColorTheme from "./useColorTheme";

export const ThemeContext = createContext({
  mode: "",
  toggleColorMode: () => {},
  theme: null,
});

export const ThemeContextProvider = ({ children }) => {
  const values = useColorTheme();
  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
