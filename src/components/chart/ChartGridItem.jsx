import { GridItem } from "../GridItem";

export const ChartGridItem = ({ title, children }) => {
  return (
    <GridItem sx={{ flexDirection: "column" }}>
      <strong style={{ alignSelf: "start", textTransform: "uppercase" }}>
        {title}
      </strong>
      {children}
    </GridItem>
  );
};
