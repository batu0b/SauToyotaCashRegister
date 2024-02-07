import { Accordion, AccordionSummary, Box } from "@mui/material";

export const CustomAccordion = ({
  expanded,
  onChange,
  children,
  accordionSx,
  summary,
  contentSx,
  summarySx,
}) => {
  return (
    <Accordion sx={[accordionSx]} expanded={expanded} onChange={onChange}>
      <AccordionSummary sx={[{ height: 60 }, summarySx]}>
        {summary}
      </AccordionSummary>
      <Box
        sx={[
          (theme) => ({
            height: "calc(100vh - 155px)",
            [theme.breakpoints.down("md")]: {
              height: "calc(100vh - 300px)",
            },
            [theme.breakpoints.down("sm-md")]: {
              height: 500,
            },
          }),
          contentSx,
        ]}
      >
        {children}
      </Box>
    </Accordion>
  );
};
