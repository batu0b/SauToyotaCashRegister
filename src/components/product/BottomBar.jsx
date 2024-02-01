import { Fab, TextField } from "@mui/material";
import { Box } from "@mui/system";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const BottomBar = ({ handleSearch, setQuery, query }) => {
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
          }}
        >
          <TextField
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            size="small"
            label="search"
            aria-readonly={true}
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
