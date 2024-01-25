import { useThemeContext } from "../context/theme/ThemeContext";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Box } from "@mui/material";

export const ThemeSwitcher = ({
  position = "absolute",
  rigt,
  left,
  bottom,
  top,
}) => {
  const { mode, toggleColorMode } = useThemeContext();
  return (
    <Box
      sx={{
        position: position,
        top: top,
        bottom: bottom,
        right: rigt,
        left: left,
      }}
    >
      <IconButton disableRipple onClick={toggleColorMode}>
        {mode === "dark" ? (
          <Brightness7Icon fontSize={"large"} />
        ) : (
          <Brightness4Icon fontSize={"large"} />
        )}
      </IconButton>
    </Box>
  );
};
