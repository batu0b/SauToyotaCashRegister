import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const TopFilterSelect = ({
  currentValue,
  list,
  showCustomValue,
  handleSelect,
  label,
  sx,
}) => {
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
        {list.map((x) => {
          return (
            <MenuItem key={x} value={x} onClick={() => handleSelect(x)}>
              {showCustomValue ? showCustomValue(x) : x}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
