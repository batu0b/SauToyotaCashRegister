import { createTheme } from "@mui/material";
import React, { useState } from "react";
import { getDesignTokens } from "../context/theme/theme";

export default function useColorTheme() {
  const [mode, setMode] = useState(
    window.localStorage.getItem("theme") == null
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : window.localStorage.getItem("theme")
  );

  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      window.localStorage.setItem("theme", newMode);
      return newMode;
    });
  };

  const modifiedTheme = React.useMemo(
    () => createTheme(getDesignTokens(mode)),
    [mode]
  );

  return {
    theme: modifiedTheme,
    mode,
    toggleColorMode,
  };
}
