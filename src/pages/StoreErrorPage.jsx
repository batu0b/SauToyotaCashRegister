import React from "react";
import { ContainerDiv } from "../components/ContainerDiv";
import Lottie from "react-lottie";
import noConnection from "../assets/NoConnection.json";
import { Box, Fab, Typography, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useServerStatusContex } from "../context/server_status/ServerStatusContex";
import { Navigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
export default function StoreErrorPage() {
  const { t } = useTranslation();
  const { breakpoints } = useTheme();
  const match = useMediaQuery(breakpoints.down("sm"));
  const { serverIsAlive } = useServerStatusContex();
  if (serverIsAlive) {
    return <Navigate to={"/"} replace />;
  }
  return (
    <ContainerDiv sx={{ gap: 2 }}>
      <Box
        sx={{
          width: match ? 200 : 350,
          height: match ? 200 : 350,
          bgcolor: ({ palette }) => palette.customSecondary,
          borderRadius: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Lottie
          options={{
            animationData: noConnection,
            autoplay: true,
            loop: true,
          }}
          height={match ? 150 : 350}
        />
      </Box>
      <Typography color={"error.main"} variant="h5">
        {t("StoreIsOffline")}
      </Typography>
    </ContainerDiv>
  );
}
