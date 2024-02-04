import { createTheme } from "@mui/material";

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
          background: {
            default: "#eeeeee",
          },
          customSecondary: "#ffff",
          customInput: "#efffff",
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
          customSecondary: "#272727",
          customInput: "#303030",
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
        "input[type=number]": props.unstable_sx({ MozAppearance: "textfield" }),
        "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button":
          props.unstable_sx({
            WebkitAppearance: "none",
            margin: 0,
          }),
        ".modal_box": props.unstable_sx({
          position: "absolute",
          minHeight: "30vh",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minwidth: 400,
          bgcolor: "primary.main",
          border: `2px solid "#111"`,
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          color: "#eee",
        }),
        "*": {
          scrollbarColor: props.palette.background.paper,
        },
        "*::-webkit-scrollbar": {
          height: 12,
          width: 16,
        },
        "*::-webkit-scrollbar-track": {
          borderRadius: 5,
          backgroundColor: props.palette.customSecondary,
        },
        "*::-webkit-scrollbar-track:hover": {
          backgroundColor: props.palette.customSecondary,
        },
        "*::-webkit-scrollbar-track:active": {
          backgroundColor: props.palette.customSecondary,
        },
        "*::-webkit-scrollbar-thumb": {
          borderRadius: 5,
          backgroundColor: props.palette.secondary.dark,
        },
        "*::-webkit-scrollbar-thumb:hover": {
          backgroundColor: props.palette.secondary.main,
        },
        "*::-webkit-scrollbar-thumb:active": {
          backgroundColor: props.palette.secondary.main,
        },
        "#html5-qrcode-button-camera-stop": {
          display: "none!important",
        },
        "#html5qr-code-full-region img": {
          display: "none!important",
        },
        "#html5-qrcode-anchor-scan-type-change": {
          display: "none!important",
        },
      }),
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
        color: "secondary",
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      "sm-md": 750,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  shape: {
    borderRadius: 7,
  },
});
