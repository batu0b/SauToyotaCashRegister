import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import { useState } from "react";

export const CategoryMenuBar = ({
  categories,
  setCategory,
  currentCategory,
}) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDataAndClose = (x) => {
    handleClose();
    setCategory(x);
  };

  return (
    <Box>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <CategoryIcon fontSize={"large"} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 60 * 4.5,
            width: "30ch",
          },
        }}
      >
        {categories.map((x) => (
          <MenuItem
            selected={x.url == currentCategory}
            key={x.category + Math.random()}
            onClick={() => handleDataAndClose(x)}
          >
            {x.category}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
