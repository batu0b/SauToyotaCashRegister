import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export const ResponsivePieChart = ({
  width = "100%",
  data = [],
  pieDataKey,
  outerRadius,
  innerRadius,
  showTooltip = true,
  customLabel = false,
  CustomTooltip,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  function randomColor() {
    const color = "#" + Math.random().toString(16).substr(2, 6);
    return color;
  }

  return (
    <ResponsiveContainer width={width} height={300}>
      <PieChart
        style={{
          background: theme.palette.primary.light,
          borderRadius: theme.shape.borderRadius,
        }}
      >
        <Pie
          isAnimationActive
          style={{ background: "red", color: "black" }}
          innerRadius={innerRadius}
          dataKey={pieDataKey}
          data={data}
          label={{
            fill: theme.palette.background.default,
            stroke: theme.palette.background.default,
          }}
          labelLine={{
            fill: theme.palette.background.default,
            color: theme.palette.background.default,
            stroke: theme.palette.background.default,
          }}
          outerRadius={outerRadius}
          fill="red"
        >
          {data.map((val, index) => {
            const color = randomColor();
            return (
              <Cell
                stroke={theme.palette.background.default}
                key={index}
                fill={color}
              />
            );
          })}
        </Pie>
        {showTooltip ? (
          <Tooltip
            labelFormatter={(str) => t(str)}
            content={customLabel ? <CustomTooltip /> : null}
            itemStyle={{
              color: theme.palette.text.primary,
              background: theme.palette.background.default,
            }}
            labelStyle={{
              color: theme.palette.text.primary,
              background: theme.palette.background.default,
            }}
            contentStyle={{
              color: theme.palette.text.primary,
              borderRadius: 12,
              background: theme.palette.background.default,
            }}
            cursor={{
              stroke: theme.palette.background.default,
              background: theme.palette.background.default,
            }}
          />
        ) : null}
      </PieChart>
    </ResponsiveContainer>
  );
};
