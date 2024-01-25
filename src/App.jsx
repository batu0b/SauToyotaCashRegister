import { ThemeProvider } from "@emotion/react";
import { useThemeContext } from "./context/theme/ThemeContext";
import { CssBaseline } from "@mui/material";

function App() {
  const { theme } = useThemeContext();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
