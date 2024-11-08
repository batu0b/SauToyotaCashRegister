import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

export const TopFilterSelect = ({
  currentValue,
  list,
  showCustomValue,
  handleSelect,
  label,
  localSections,
  sx,
}) => {
  const { t } = useTranslation();
  return (
    <FormControl sx={{ sx }} fullWidth>
      <InputLabel id={label + "-label"}>{label}</InputLabel>
      <Select
        size="small"
        sx={[{ width: "100%" }]}
        value={currentValue}
        label={label}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 200,
            },
          },
        }}
        labelId={label + "-label"}
      >
        {localSections &&
          localSections?.map((x) => {
            return (
              <MenuItem key={x} value={x} onClick={() => handleSelect(x)}>
                {t(showCustomValue ? showCustomValue(x) : x)}
              </MenuItem>
            );
          })}
        {list.map((x) => {
          return (
            <MenuItem key={x} value={x} onClick={() => handleSelect(x)}>
              {t(showCustomValue ? showCustomValue(x) : x)}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
