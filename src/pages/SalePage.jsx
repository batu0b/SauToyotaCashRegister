import { Badge, Box, Button, TextField, useMediaQuery } from "@mui/material";
import { ContainerDiv } from "../components/ContainerDiv";
import { VirtualKeyboard } from "../components/keyboard/VirtualKeyboard";
import { useRef, useState } from "react";
import { useTheme } from "@emotion/react";
import { CustomAccordion } from "../components/sale/CustomAccordion";
import { useOutletContext } from "react-router-dom";
import { AccordionProducts } from "../components/sale/AccordionProducts";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useBasketContext } from "../context/basket/BasketContext";
export default function SalePage() {
  const { cart, addToCart, total } = useBasketContext();
  const { categories, products } = useOutletContext();
  const [numpadInput, setNumpadInput] = useState("");
  const [expand, setExpand] = useState("basket");
  const [stage, setStage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const keyboard = useRef(null);

  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down("md"));

  console.log(cart);
  const handleAcordion = (panel, current) => {
    setExpand((prev) => (prev === panel ? current : panel));
  };

  const handleAddToCart = () => {
    if (selectedProduct && numpadInput.trim().length > 0) {
      addToCart(selectedProduct, parseFloat(numpadInput));
      setNumpadInput("");
      setSelectedProduct(null);
      keyboard.current.setInput("");
    }
  };

  const getActionButtons = () => {
    switch (stage) {
      case 1:
        return (
          <>
            <Button color="warning">Kampanya Listesi</Button>
            <Button color="primary">Ödeme Ekranı</Button>
            <Button onClick={handleAddToCart}>Sepete Ürün Adeti Ekle</Button>
          </>
        );

      case 2:
        return (
          <>
            <Button color="warning">Kampanya Listesi</Button>
            <Button>Sepete Ürün Adeti Ekle</Button>
          </>
        );
      default:
        break;
    }
  };

  return (
    <ContainerDiv tooolbarIsActive={match}>
      <Box
        sx={(theme) => ({
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItemsL: "center",
          [theme.breakpoints.down("md")]: {
            maxHeight: "calc(100vh - 150px)",
          },
          [theme.breakpoints.down("sm-md")]: {
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: 0,
          },
        })}
      >
        <Box
          sx={{
            flexBasis: 400,
            display: "flex",
            flexDirection: "column",
            flexShrink: 1,
          }}
        >
          <Box
            sx={{
              flexBasis: "100%",
              flexShrink: 0,
              padding: 1,
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: "customSecondary",
                borderRadius: 1,
                boxShadow: 1,
              }}
            >
              <Box sx={{ flexBasis: "100%" }}>
                <TextField
                  value={numpadInput}
                  variant="filled"
                  color="secondary"
                  sx={{
                    bgcolor: "customInput",
                    mb: 1,
                    borderRadius: 1,
                  }}
                  fullWidth
                />
                <Box sx={{ display: "flex" }}>
                  <VirtualKeyboard
                    ref={keyboard}
                    isNumpad
                    setInput={setNumpadInput}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: 100,
                      gap: 1,
                      paddingY: 1,
                    }}
                  >
                    {getActionButtons()}
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button color="error">Belge Iptal</Button>
                  <Button color="error">Satir Iptal</Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            flexBasis: "calc(100% - 400px)",
            minWidth: 400,
            maxWidth: 700,
            flexShrink: 0,
            height: "100%",
            padding: 1,
          }}
        >
          <CustomAccordion
            summary={"Urunler"}
            expanded={expand === "basket"}
            onChange={() => handleAcordion("product", "basket")}
          >
            <AccordionProducts
              setSelectedProduct={setSelectedProduct}
              selectedProduct={selectedProduct}
              products={products}
              categories={categories}
            />
          </CustomAccordion>

          <CustomAccordion
            expanded={expand === "product"}
            onChange={() => handleAcordion("basket", "product")}
            summary={
              <Badge badgeContent={cart.length} color="primary">
                <ShoppingBasketIcon />
              </Badge>
            }
          >
            {total}
          </CustomAccordion>
        </Box>
      </Box>
    </ContainerDiv>
  );
}
