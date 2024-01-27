import { Container, Toolbar } from "@mui/material";
export const ContainerDiv = ({ children, maxWidth = false, sx = {} }) => {
  return (
    <Container
      maxWidth={maxWidth}
      sx={[
        {
          padding: 2,
          minHeight: "100vh",
          display: "flex",
          flexWrap: "nowrap",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        },
        sx,
      ]}
    >
      <Toolbar />
      {children}
    </Container>
  );
};
