import { Box } from "@mui/material";
import { ContainerDiv } from "../components/ContainerDiv";

export default function SalePage() {
  return (
    <ContainerDiv tooolbarIsActive={false}>
      <Box
        sx={(theme) => ({
          width: "100%",
          height: "100%",
          bgcolor: "red",
          display: "flex",
          flexWrap: "wrap-reverse",
          justifyContent: "center",
          alignItemsL: "center",
          [theme.breakpoints.down("md")]: {
            minHeight: "calc(100vh - 8rem)",
            marginTop: 7,
          },
        })}
      >
        <Box
          sx={{
            flexBasis: "50%",
            flexDirection: "column",
            display: "flex",
            flexShrink: 0,
          }}
        >
          <Box sx={{ flexBasis: "50%", bgcolor: "blue" }}>
            <Box sx={{ height: 300, width: 300, bgcolor: "error.main" }} />
          </Box>
          <Box sx={{ flexBasis: "50%", bgcolor: "yellow" }}>
            <Box sx={{ height: 300, width: 300, bgcolor: "warning.main" }} />
          </Box>
        </Box>
        <Box sx={{ flexBasis: "50%", flexShrink: 0 }}>
          {" "}
          <Box sx={{ height: 300, width: 300, bgcolor: "success.main" }} />
        </Box>
      </Box>
    </ContainerDiv>
  );
}
