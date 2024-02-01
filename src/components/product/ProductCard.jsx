import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { getFavorites, setFavorites } from "../../helpers";
import { useAuthContext } from "../../context/auth/AuthContext";
//TODO lang
export const ProductCard = ({ product, style }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useAuthContext();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const favs = JSON.parse(getFavorites()) || [];
  const userCode = user.userCode;
  const userFavs = favs ? favs.find((favs) => favs.id == userCode) : false;
  let isThisFav = userFavs ? userFavs.products.includes(product.id) : false;
  const handleFav = () => {
    if (!isThisFav) {
      if (userFavs) {
        const newFavs = favs.map((x) => {
          if (x.id == userCode) {
            return { ...x, products: [...x.products, product.id] };
          } else {
            return x;
          }
        });
        setFavorites(JSON.stringify(newFavs));
      } else {
        favs.push({ id: user.userCode, products: [product.id] });
        setFavorites(JSON.stringify(favs));
      }
    } else {
      const newFavs = favs.map((x) => {
        if (x.id == userCode) {
          return {
            ...x,
            products: x.products.filter(
              (productId) => productId !== product.id
            ),
          };
        } else {
          return x;
        }
      });
      setFavorites(JSON.stringify(newFavs));
    }
    handleClose();
  };
  return (
    <Card
      style={style}
      sx={{
        width: 300,
        borderRadius: 1,
        position: "relative",
        height: 500,
      }}
    >
      <IconButton
        onClick={handleClick}
        sx={{ position: "absolute", right: 0, top: 0 }}
      >
        <MoreVertIcon fontSize="medium" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 80,
          },
        }}
      >
        <MenuItem onClick={handleFav}>
          {isThisFav ? "Remove From Favorites" : "Add To Favorites"}
        </MenuItem>
      </Menu>
      <CardContent
        sx={{
          height: "10.5rem",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            color: "secondary.main",
            marginRight: 1,
            wordWrap: "break-word",
          }}
          variant="h6"
        >
          {product.name}
        </Typography>
        <Typography variant="body1" fontFamily={"monospace"}>
          price: {product.price}
        </Typography>
        <Typography variant="body1" fontFamily={"monospace"}>
          barcode: {product.barcode}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        height={300}
        image={product.img_url}
        alt={product.name}
      />
      <CardActions>
        <Button size="small" fullWidth color="primary">
          <Typography variant="button">Add To Cart</Typography>
          <AddShoppingCartIcon />
        </Button>
      </CardActions>
    </Card>
  );
};
