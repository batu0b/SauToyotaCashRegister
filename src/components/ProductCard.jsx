import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export const ProductCard = ({ product, style }) => {
  return (
    <Card
      sx={{
        width: 300,
        flexShrink: 0,
        borderRadius: 1,
      }}
    >
      <CardContent sx={{ minHeight: "10.5rem" }}>
        <Typography sx={{ color: "secondary.main" }} variant="h6">
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
        alt="green iguana"
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
