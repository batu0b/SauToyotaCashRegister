import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const MatchesAppBar = ({ location, serverIsAlive, t, handleDrawer }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            onClick={handleDrawer}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t(location)}
          </Typography>
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
        </Toolbar>
      </AppBar>
    </Box>
  );
};
