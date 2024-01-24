import { ThemeProvider } from "@emotion/react";
import "./App.css";
import { useThemeContext } from "./context/theme/ThemeContext";

function App() {
  const { theme } = useThemeContext();
  return <ThemeProvider theme={theme}></ThemeProvider>;
}

export default App;
