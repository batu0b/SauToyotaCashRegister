import { ThemeProvider } from "@emotion/react";
import { useThemeContext } from "./context/theme/ThemeContext";
import { CssBaseline } from "@mui/material";
import { PageRouter } from "./router";

function App() {
  const { theme } = useThemeContext();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PageRouter />
    </ThemeProvider>
  );
}

export default App;
