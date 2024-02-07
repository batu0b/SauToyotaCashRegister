import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { useBasketContext } from "../../context/basket/BasketContext";
import { useTranslation } from "react-i18next";

export const PromotionsModal = ({ open, handleClose }) => {
  const { promotions, setCurrentPromotion } = useBasketContext();
  const { t } = useTranslation();
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        className="modal_box"
        sx={{
          display: "flex",
          flexDirection: "column",
          maxHeight: 400,
          gap: 2,
        }}
      >
        <Box sx={{ flexBasis: "30px" }}>
          <Typography>{t("pleaseSelectCampaign")}</Typography>
          <Typography>{t("onlyOneDiscount")}</Typography>
        </Box>

        <Box
          sx={{
            flexBasis: "100%",
            gap: 2,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            p: 2,
          }}
        >
          {promotions.map((x) => (
            <Button
              onClick={() => {
                setCurrentPromotion(x);
                handleClose();
              }}
              key={x.title}
            >
              <Typography>{x.title}</Typography>
            </Button>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};
