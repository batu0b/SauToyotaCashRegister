import { ThemeProvider } from "@emotion/react";
import "./App.css";
import { useThemeContext } from "./context/theme/ThemeContext";
import { Button } from "@mui/material";

function App() {
  const { theme, toggleColorMode } = useThemeContext();
  const fetchDataTest = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/post`, {
        body: JSON.stringify({ data: "test" }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" onClick={fetchDataTest}>
        Fetch Test
      </Button>
      <Button onClick={toggleColorMode}>Change Theme</Button>
    </ThemeProvider>
  );
}

export default App;
