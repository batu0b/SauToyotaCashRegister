import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import { ContainerDiv } from "../components/ContainerDiv";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useAuthContext } from "../context/auth/AuthContext";
import PrintIcon from "@mui/icons-material/Print";
import { useServerStatusContex } from "../context/server_status/ServerStatusContex";
import CableIcon from "@mui/icons-material/Cable";
import { storeConnectionPostService } from "../services";
import { InvoiceViewer } from "../components/sale/InvoiceViewer";
import { useState } from "react";

export default function Settigns() {
  const { t } = useTranslation();
  const { logOut } = useAuthContext();
  const { serverIsAlive, setServerStatus } = useServerStatusContex();
  const [tester, setShowTester] = useState(false);

  const papperStyle = (theme) => ({
    width: "100%",
    gap: 2,
    display: "flex",
    flexDirection: "column",
    padding: 2,
  });

  return (
    <ContainerDiv sx={{ justifyContent: "flex-start", gap: 3 }}>
      <Paper sx={papperStyle}>
        <SettingsItem title={t("changeTheme")}>
          <ThemeSwitcher
            sx={{ marginLeft: 4 }}
            disableRipple={false}
            position="flex"
          />
        </SettingsItem>
        <SettingsItem title={t("changeLang")}>
          <LanguageSwitcher
            sx={{ marginLeft: 4 }}
            disableRipple={false}
            position="flex"
          />
        </SettingsItem>
        <SettingsItem title={t("printTest")}>
          <Box>
            <IconButton
              onClick={() => setShowTester(true)}
              sx={{
                marginLeft: 4,
              }}
            >
              <PrintIcon fontSize="large" />
            </IconButton>
          </Box>
        </SettingsItem>
      </Paper>

      <Paper sx={papperStyle}>
        <SettingsItem
          titleSx={{
            color: serverIsAlive ? "warning.main" : "success.main",
            "&::before, &::after": {
              borderColor: serverIsAlive ? "warning.main" : "success.main",
            },
          }}
          title={t(serverIsAlive ? "dscStore" : "connectStore")}
        >
          <Box sx={{ paddingLeft: 4, paddingRight: 4, marginTop: 2 }}>
            <Button
              fullWidth
              onClick={() =>
                storeConnectionPostService(serverIsAlive, setServerStatus)
              }
              color={serverIsAlive ? "warning" : "success"}
            >
              <CableIcon sx={{ color: "#eee" }} fontSize={"large"} />
            </Button>
          </Box>
        </SettingsItem>
      </Paper>

      <Paper sx={papperStyle}>
        <SettingsItem
          titleSx={{
            color: "error.main",
            "&::before, &::after": {
              borderColor: "error.main",
            },
          }}
          title={t("logOut")}
        >
          <Box sx={{ paddingLeft: 4, paddingRight: 4, marginTop: 2 }}>
            <Button fullWidth onClick={logOut} color="error">
              <ExitToAppIcon fontSize={"large"} />
            </Button>
          </Box>
        </SettingsItem>
      </Paper>
      {tester ? (
        <PrintTester handleClose={() => setShowTester(false)} open={tester} />
      ) : null}
    </ContainerDiv>
  );
}

const SettingsItem = ({ children, title, boxSx, titleSx }) => {
  return (
    <Box
      sx={[
        {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        },
        boxSx,
      ]}
    >
      <Divider sx={titleSx} flexItem variant="middle" textAlign="left">
        <Typography sx={titleSx} variant="h5">
          {title}
        </Typography>
      </Divider>
      {children}
    </Box>
  );
};

const PrintTester = ({ handleClose, open }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ height: 600, width: 500 }} className="modal_box">
        <InvoiceViewer handleFinish={handleClose} isTest={true} />
      </Box>
    </Modal>
  );
};
