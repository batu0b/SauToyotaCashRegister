import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export const DrawerList = ({ list, currentPathname, translator }) => {
  return (
    <List>
      {list.map((x, index) => (
        <ListItem
          key={x.pathname}
          sx={{
            background: ({ palette }) =>
              x.pathname === currentPathname ? palette.action.focus : null,
          }}
          disablePadding
        >
          <ListItemButton onClick={() => x.method(x)}>
            <ListItemIcon>{x.ico}</ListItemIcon>
            <ListItemText primary={translator(x.name)} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
