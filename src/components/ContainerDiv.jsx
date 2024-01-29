import { Container, Toolbar } from "@mui/material";
export const ContainerDiv = ({
  children,
  maxWidth = false,
  sx = {},
  tooolbarIsActive = true,
  toolbarSx,
  ...props
}) => {
  return (
    <Container
      {...props}
      maxWidth={maxWidth}
      sx={[
        (theme) => ({
          padding: 0,
          minHeight: "100vh",
          display: "flex",
          flexWrap: "nowrap",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          [theme.breakpoints.down("md")]: {
            width: "100%",
          },
          width: "calc(100% - 210px)",
        }),
        sx,
      ]}
    >
      {tooolbarIsActive ? <Toolbar sx={toolbarSx} /> : null}

      {children}
    </Container>
  );
};
