import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

function CustomTooltipForBestSeller({ payload, active }) {
  const { t } = useTranslation();

  if (active) {
    return (
      <Box
        sx={{
          background: ({ palette }) => palette.background.default,
          borderRadius: 1,
          padding: 1,
        }}
      >
        <Typography>{`${t(payload[0].name, {
          brand: payload[0].payload.brand,
        })}  : ${payload[0].value}`}</Typography>
      </Box>
    );
  }

  return null;
}

export { CustomTooltipForBestSeller };
