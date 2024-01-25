import { Box, MenuItem, Modal, Select, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export const LanguageModal = ({ open, handleClose }) => {
  const langs = [
    { name: "English", code: "en" },
    { name: "Türkçe", code: "tr" },
  ];
  const { t, i18n } = useTranslation();
  console.log(i18n.language);
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        className="modal_box"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {t("slctLng")}
        </Typography>
        <Select
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          sx={{ bgcolor: ({ palette }) => palette.background.default }}
          value={i18n.language}
          fullWidth
          id="modal-modal-description"
        >
          {langs.map((x) => {
            return (
              <MenuItem key={x.code} value={x.code}>
                {x.name}
              </MenuItem>
            );
          })}
        </Select>
      </Box>
    </Modal>
  );
};
