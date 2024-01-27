import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../context/auth/AuthContext";
import { ResponsiveLineChart } from "../components/chart/ResponsiveLineChart";
import { ResponsivePieChart } from "../components/chart/ResponsivePieChart";
import { ChartGridItem } from "../components/chart/ChartGridItem";
import { useAxios } from "../hooks/useAxios";
import { CustomTooltipForBestSeller } from "../components/chart/CustomTooltipForBestSeller";

export default function HomePage() {
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const { response, isLoading, error } = useAxios({
    url: `/charts/${user.userCode}`,
    method: "GET",
    isCache: true,
  });

  return (
    <Container
      maxWidth={false}
      sx={{
        padding: 2,
        minHeight: "100vh",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Toolbar />
      <Box
        sx={(theme) => ({
          position: "absolute",
          top: 10,
          left: 22,
          marginTop: 2,
          display: "flex",
          alignItems: "center",
          padding: 1,
          borderRadius: 1,
          [theme.breakpoints.down("md")]: {
            visibility: "hidden",
          },
        })}
      >
        <Typography fontFamily={"monospace"} variant="h4">
          {t("Welcome") + " " + user.name + " " + user.surname}{" "}
        </Typography>
      </Box>

      {isLoading ? (
        <CircularProgress />
      ) : error ? null : (
        <>
          <Typography
            sx={(theme) => ({
              padding: 1,
              visibility: "hidden",
              [theme.breakpoints.down("md")]: {
                visibility: "visible",
              },
            })}
            fontFamily={"monospace"}
            variant="h4"
          >
            {t("Welcome") + " " + user.name + " " + user.surname}{" "}
          </Typography>
          <Grid marginTop={"22px"} container spacing={2}>
            <Grid item xs={12}>
              <ChartGridItem title={t(response?.data.lastWeekSales.title)}>
                <ResponsiveLineChart
                  data={response?.data.lastWeekSales.data}
                  xDataKey={"name"}
                  lineDataKey={"total"}
                />
              </ChartGridItem>
            </Grid>

            <Grid
              sx={{ justifyContent: "center" }}
              container
              gap={2}
              item
              xs={12}
            >
              <Grid xl={5} item xs={12}>
                <ChartGridItem title={t(response?.data.bestSeller.title)}>
                  <ResponsivePieChart
                    CustomTooltip={CustomTooltipForBestSeller}
                    customLabel={true}
                    data={response?.data.bestSeller.data}
                    outerRadius={80}
                    innerRadius={30}
                    pieDataKey={"total"}
                  />
                </ChartGridItem>
              </Grid>
              <Grid xl={5} xs={12} item>
                <ChartGridItem title={t(response?.data.averageCustomer.title)}>
                  <ResponsiveLineChart
                    lineType="lineer"
                    data={response?.data.averageCustomer.data}
                    xDataKey={"name"}
                    lineDataKey={"average"}
                  />
                </ChartGridItem>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
}
