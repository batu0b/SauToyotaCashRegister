import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { useAuthContext } from "../context/auth/AuthContext";
import { loginService } from "../services";
import { useFormik } from "formik";
import { LoginSchema } from "../validations";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

//TODO 
export default function AuthPage() {
  const { t } = useTranslation();
  const { setIsAuth, setIsLoading, setUser, isLoading } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      password: "",
      userCode: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      const setGeneralError = (error) => {
        formik.setFieldError("general", error);
      };
      loginService({
        setUser,
        setIsAuth,
        setIsLoading,
        body: values,
        setError: setGeneralError,
      });
    },
  });

  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: "100vh",
        display: "grid",
      }}
    >
      <Box
        alignSelf={"center"}
        justifySelf={"center"}
        display={"flex"}
        flexDirection={"column"}
        gap={5}
      >
        <Box display={"flex"} flexDirection={"column"} gap={1}>
          <Typography variant="h1">Cash Register</Typography>
          <Typography variant="h3">SAU - TOYOTA</Typography>
        </Box>
        <Box
          sx={{
            flexShrink: 0,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            gap: 5,
            flexBasis: "40%",
            width: "100%",
            flexDirection: "column",
          }}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <Box flexDirection={"column"} display={"flex"} gap={5} width={"100%"}>
            <TextField
              onKeyDown={(evt) =>
                ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
              }
              error={
                formik.errors.userCode && formik.touched.userCode ? true : false
              }
              helperText={
                formik.errors.userCode && formik.touched.userCode
                  ? t(formik.errors.userCode)
                  : null
              }
              onChange={formik.handleChange}
              value={formik.values.userCode}
              name="userCode"
              label={t("UserName")}
              type="number"
              className="input"
            />
            <TextField
              error={
                formik.errors.password && formik.touched.password ? true : false
              }
              helperText={
                formik.errors.password && formik.touched.password
                  ? t(formik.errors.password)
                  : null
              }
              onChange={formik.handleChange}
              value={formik.values.password}
              name="password"
              type="password"
              label={t("Password")}
              border
            />
          </Box>
          <Button
            type="submit"
            sx={{ width: "100%", fontSize: 18, height: 44 }}
            variant="contained"
            disabled={isLoading}
          >
            {!isLoading ? t("Login") : <CircularProgress size={32} />}
          </Button>
          <Typography fontWeight={700} variant="overline" color={"error"}>
            {" "}
            {t(formik.errors.general)}
          </Typography>
        </Box>
      </Box>
      <LanguageSwitcher bottom={80} />
      <ThemeSwitcher bottom={24} />
    </Container>
  );
}
