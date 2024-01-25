import { Box, CircularProgress, Container } from "@mui/material";

export const FullPageLoader = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: "100vh",
        display: "grid",
      }}
    >
      <Box alignSelf={"center"} justifySelf={"center"}>
        <CircularProgress size={32} />
      </Box>
    </Container>
  );
};
