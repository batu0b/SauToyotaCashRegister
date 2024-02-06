import { Badge, Box, Divider, Drawer, Typography } from "@mui/material";
import { useServerStatusContex } from "../../context/server_status/ServerStatusContex";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../../context/auth/AuthContext";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import CampaignIcon from "@mui/icons-material/Campaign";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { MatchesAppBar } from "./MatchesAppBar";
import { DrawerList } from "./DrawerList";
import { QrModal } from "../qr/QrModal";
import { useBasketContext } from "../../context/basket/BasketContext";

export const AppDrawer = ({ matches }) => {
  const { pathname } = useLocation();
  const navigation = useNavigate();
  const [showQrModal, setShowQrModal] = useState(false);
  const [open, setOpen] = useState(false);
  const { serverIsAlive } = useServerStatusContex();
  const { itemCount } = useBasketContext();
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const handleQrModal = useCallback(() => {
    setShowQrModal(true);
    handleDrawer();
  }, []);

  const handleCloseQrModal = useCallback(() => {
    setShowQrModal(false);
  }, []);

  const handleDrawer = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleNavigation = useCallback((x) => {
    navigation(x.pathname);
    handleDrawer();
  }, []);

  const upperNav = [
    {
      pathname: "/",
      name: "Dashboard",
      ico: <DashboardIcon />,
      method: handleNavigation,
    },
    {
      pathname: "/products",
      name: "Products",
      ico: <InventoryIcon />,
      method: handleNavigation,
    },
    {
      pathname: "/sale",
      name: "Sale",
      ico: (
        <Badge badgeContent={itemCount} color="secondary">
          <StorefrontIcon />
        </Badge>
      ),
      method: handleNavigation,
    },
    {
      pathname: "/qr",
      name: "Qr",
      ico: <QrCodeIcon />,
      method: handleQrModal,
    },
    {
      pathname: "/campaigns",
      name: "Campaigns",
      ico: <CampaignIcon />,
      method: handleNavigation,
    },
  ];
  const downNav = [
    {
      pathname: "/settings",
      name: "Settings",
      ico: <SettingsIcon />,
      method: handleNavigation,
    },
  ];

  return (
    <>
      {matches ? (
        <MatchesAppBar
          handleDrawer={handleDrawer}
          serverIsAlive={serverIsAlive}
          location={
            upperNav.concat(downNav).find((x) => x.pathname === pathname)?.name
          }
          t={t}
        />
      ) : null}
      <Drawer
        sx={{
          width: 210,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 210,
            boxSizing: "border-box",
          },
        }}
        variant={matches ? "temporary" : "permanent"}
        anchor="left"
        open={open}
        onClose={handleDrawer}
      >
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 1, padding: 2 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                height: 14,
                width: 14,
                backgroundColor: ({ palette }) =>
                  serverIsAlive ? palette.success.main : palette.error.main,
                borderRadius: 50,
              }}
            />
            <Typography
              variant="overline"
              sx={{
                lineHeight: 0,
                color: ({ palette }) =>
                  serverIsAlive ? palette.success.main : palette.error.main,
              }}
            >
              {serverIsAlive ? t("StoreIsOnline") : t("StoreIsOffline")}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="caption">
              {t("storeNumber") + " : " + user.storeNumber}
            </Typography>
            <Typography variant="caption">
              {" "}
              {t("cashRegisterNumber") + " : " + user.cashRegisterNumber}
            </Typography>
            <Typography variant="caption">
              {" "}
              {t("ipNo") + " : " + user.ipNo}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <DrawerList list={upperNav} currentPathname={pathname} translator={t} />
        <Divider />
        <DrawerList list={downNav} currentPathname={pathname} translator={t} />
        <Divider />
      </Drawer>
      <QrModal handleClose={handleCloseQrModal} open={showQrModal} />
    </>
  );
};
