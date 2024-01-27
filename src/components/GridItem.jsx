import { Box } from "@mui/material";
import React from "react";

export const GridItem = ({ children, sx }) => {
  return (
    <Box
      sx={[
        {
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        { ...sx },
      ]}
    >
      {children}
    </Box>
  );
};
