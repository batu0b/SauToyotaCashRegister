import React from "react";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import { Box, IconButton } from "@mui/material";
import { LanguageModal } from "./LanguageModal";

export const LanguageSwitcher = ({
  position = "absolute",
  rigt,
  left,
  bottom,
  top,
  disableRipple = true,
  sx,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={[
        {
          position: position,
          top: top,
          bottom: bottom,
          right: rigt,
          left: left,
        },
        sx,
      ]}
    >
      <IconButton disableRipple={disableRipple} onClick={handleOpen}>
        <GTranslateIcon fontSize={"large"} />
      </IconButton>
      <LanguageModal open={open} handleClose={handleClose} />
    </Box>
  );
};
