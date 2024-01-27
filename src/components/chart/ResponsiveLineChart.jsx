import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const ResponsiveLineChart = ({
  width = "100%",
  height = 300,
  data,
  lineDataKey,
  lineType = "monotone",
  xDataKey,
  yDataKey,
  showTooltip = true,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart
        style={{
          background: theme.palette.primary.light,
          borderRadius: theme.shape.borderRadius,
          padding: 12,
        }}
        data={data}
      >
        <CartesianGrid stroke={theme.palette.text.primary} />
        <XAxis
          dataKey={xDataKey}
          tickFormatter={(str) => t(str)}
          stroke={theme.palette.text.primary}
        />
        <YAxis dataKey={yDataKey} stroke={theme.palette.text.primary} />
        {showTooltip ? (
          <Tooltip
            labelFormatter={(str) => t(str)}
            itemStyle={{
              background: theme.palette.background.default,
            }}
            labelStyle={{
              background: theme.palette.background.default,
            }}
            contentStyle={{
              borderRadius: 12,
              background: theme.palette.background.default,
            }}
            cursor={{
              stroke: theme.palette.background.default,
              background: theme.palette.background.default,
            }}
          />
        ) : null}
        <Line
          dataKey={lineDataKey}
          type={lineType}
          stroke={theme.palette.secondary.light}
          strokeWidth={4}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
