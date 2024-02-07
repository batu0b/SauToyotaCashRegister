import { Fab } from "@mui/material";
import { Box } from "@mui/system";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReplayIcon from "@mui/icons-material/Replay";
import { useTranslation } from "react-i18next";
import { KeyboardModal } from "../keyboard/KeyboardModal";
export const BottomBar = ({ handleSearch, setQuery, query, handleReset }) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        borderTop: "2px solid ",
        borderColor: "customSecondary",
        height: "60px",
        display: "flex",
        justifyContent: "space-evenly",
        bgcolor: "customSecondary",
        alignItems: "center",
        px: 2,
      }}
    >
      <form
        style={{
          width: "90%",
          maxWidth: 900,
        }}
        onSubmit={handleSearch}
      >
        <Box
          role="div"
          sx={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            width: "100%",
            gap: 1,
          }}
        >
          <Fab
            onClick={handleReset}
            type="button"
            variant="extended"
            size="small"
          >
            <ReplayIcon />
          </Fab>
          <KeyboardModal
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            size="small"
            label={t("searchBarLabel")}
            setInpit={setQuery}
          />
          <Fab
            type="submit"
            size="small"
            sx={{ position: "absolute", right: -10 }}
          >
            <CheckCircleIcon />
          </Fab>
        </Box>
      </form>
    </Box>
  );
};
