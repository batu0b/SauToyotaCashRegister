
export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: "#37474f",
          },
          secondary: {
            main: "#f50057",
          },
          error: {
            main: "#f44336",
          },
        }
      : {
          primary: {
            main: "#ff5722",
          },
          secondary: {
            main: "#b2ff59",
          },
          error: {
            main: "#f44336",
          },
          divider: "#757575",
          text: {
            hint: "#ede7f6",
            disabled: "#777777",
            secondary: "#f3e5f5",
          },
        }),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (props) => ({
        body: {
          backgroundColor: props.palette.background,
          minHeight: "100vh",
        },
        "#root": {
          minHeight: "100vh",
        },
      }),
    },
  },
  shape: {
    borderRadius: 7,
  },
});
