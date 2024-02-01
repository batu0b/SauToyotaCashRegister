import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { QrCodePlugin } from "./QrCodePlugin";
import { Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
//TODO lng
export const QrModal = ({ open, handleClose }) => {
  const [result, setResult] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onNewScanResult = (decodedText, decodedResult) => {
    setResult(decodedText);
    console.log(decodedResult);
  };

  const resetAndHandleClose = () => {
    setResult(null);
    handleClose();
  };

  const ShowResult = () => {
    const scanAgain = () => {
      setResult(null);
    };
    const goToProduct = () => {
      navigate({
        pathname: "/products",
        search: `query=${result}`,
      });
      resetAndHandleClose();
    };

    return (
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <Typography>Barcode: {result}</Typography>
        <Button onClick={goToProduct}>{t("goToProduct")}</Button>
        <Button onClick={scanAgain}>{t("scanAgain")}</Button>
      </Box>
    );
  };

  return (
    <Modal open={open} onClose={resetAndHandleClose}>
      <Box
        className="modal_box"
        sx={(theme) => ({
          width: 500,
          height: 500,
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          [theme.breakpoints.down("md")]: {
            width: "100%",
          },
        })}
      >
        {result ? (
          <ShowResult />
        ) : (
          <QrCodePlugin
            fps={10}
            aspectRatio={1}
            qrBox={300}
            disableFlip={false}
            qrCodeSuccessCallback={onNewScanResult}
          />
        )}
      </Box>
    </Modal>
  );
};
