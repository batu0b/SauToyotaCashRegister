import {
  Badge,
  Box,
  Button,
  CardMedia,
  Divider,
  Fab,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ContainerDiv } from "../components/ContainerDiv";
import { VirtualKeyboard } from "../components/keyboard/VirtualKeyboard";
import { Fragment, useCallback, useRef, useState } from "react";
import { useTheme } from "@emotion/react";
import { CustomAccordion } from "../components/sale/CustomAccordion";
import { useOutletContext } from "react-router-dom";
import { AccordionProducts } from "../components/sale/AccordionProducts";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useBasketContext } from "../context/basket/BasketContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import { PromotionsModal } from "../components/sale/PromotionsModal";
import { useTranslation } from "react-i18next";
//
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EMailModal } from "../components/sale/EMailModal";
import { InvoiceModal } from "../components/sale/InvoiceModal";

export default function SalePage() {
  const {
    cart,
    itemCount,
    addToCart,
    total,
    decreaseProduct,
    increaseProduct,
    deleteCart,
    subTotal,
    removeFromCart,
    currentPromotion,
    setCurrentPromotion,
    amountPaid,
    setCardPayment,
    setCashPayment,
    payableAmount,
    customerEmail,
    setCustomerEmail,
  } = useBasketContext();
  const { t } = useTranslation();
  const { categories, products } = useOutletContext();
  const [numpadInput, setNumpadInput] = useState("");
  const [expand, setExpand] = useState("product");
  const [stage, setStage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLineCancel, setIsLineCancel] = useState(false);
  const [showPromotions, setShowPromotions] = useState(false);
  const [showEMailModal, setShowEmailModal] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const keyboard = useRef(null);
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down("md"));

  const handleAcordion = (panel, current) => {
    setExpand((prev) => (prev === panel ? current : panel));
  };
  const handleAddToCart = () => {
    if (selectedProduct && numpadInput.trim() && parseInt(numpadInput) > 0) {
      addToCart(selectedProduct, parseInt(numpadInput));
      setNumpadInput("");
      setSelectedProduct(null);
      keyboard.current.setInput("");
    }
  };
  const handleLineCancel = () => {
    if (itemCount > 0) {
      setExpand("basket");
      setIsLineCancel(true);
    }
  };
  const handleCancelLineCancel = useCallback(() => {
    setIsLineCancel(false);
  }, []);

  const handlePayment = (type) => {
    const numInp = parseFloat(numpadInput);
    if (numpadInput.trim() && numInp > 0) {
      if (type === "cash") {
        if (payableAmount > 0) {
          setCashPayment((prev) => prev + numInp);
        } else {
          toast(t("cashMax"), {
            autoClose: 1500,
            type: "error",
            position: "top-center",
            theme: "colored",
            pauseOnHover: false,
          });
        }
      } else if (type === "card") {
        if (numInp <= payableAmount) {
          setCardPayment((prev) => prev + numInp);
        } else {
          toast(t("ccMax"), {
            autoClose: 1500,
            type: "error",
            position: "top-center",
            theme: "colored",
            pauseOnHover: false,
          });
        }
      }
      setNumpadInput("");
      keyboard.current.setInput("");
    }
  };

  const getActionButtons = () => {
    switch (stage) {
      case 1:
        return (
          <Fragment>
            <Button onClick={() => setShowPromotions(true)} color="warning">
              {t("campaignList")}
            </Button>
            <Button
              onClick={() => {
                if (expand !== "basket") {
                  toast(t("checkBasketPls"), {
                    autoClose: 1500,
                    type: "warning",
                    position: "top-center",
                    theme: "colored",
                    pauseOnHover: false,
                  });
                  setExpand("basket");
                } else {
                  setStage(2);
                  setExpand("product");
                }
              }}
              color="primary"
              disabled={itemCount === 0}
            >
              {t("paymentScreen")}
            </Button>
            <Button
              disabled={
                !selectedProduct ||
                numpadInput.trim().length <= 0 ||
                !parseInt(numpadInput) > 0
              }
              onClick={handleAddToCart}
            >
              {t("add2cart")}
            </Button>
          </Fragment>
        );

      case 2:
        return (
          <Fragment>
            <Button onClick={() => setShowPromotions(true)} color="warning">
              {t("campaignList")}
            </Button>{" "}
            <Button onClick={() => setStage(1)} color="primary">
              {t("addProduct")}
            </Button>
            <Button onClick={() => handlePayment("card")} sx={{ height: 70 }}>
              {t("cc")}
            </Button>
            <Button onClick={() => handlePayment("cash")} sx={{ height: 70 }}>
              {" "}
              {t("cash")}
            </Button>
            <Button
              onClick={() => setShowInvoice(true)}
              disabled={total - amountPaid > 0}
              sx={{ height: 80 }}
            >
              {" "}
              {t("finishDoc")}
            </Button>
            <Button
              disabled={amountPaid == 0}
              onClick={() => {
                setCardPayment(0);
                setCashPayment(0);
              }}
            >
              {" "}
              {t("refund")}
            </Button>
            {showInvoice ? (
              <InvoiceModal
                handleFinish={() => {
                  setShowInvoice(false);
                  setStage(1);
                  deleteCart();
                  setCustomerEmail(null);
                }}
                open={showInvoice}
                handleClose={() => setShowInvoice(false)}
              />
            ) : null}
          </Fragment>
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
                  <Button
                    onClick={() => {
                      deleteCart();
                      setStage(1);
                      setCustomerEmail(null);
                    }}
                    color="error"
                  >
                    {t("cancelDocument")}
                  </Button>
                  {isLineCancel ? (
                    <Button onClick={handleCancelLineCancel} color="warning">
                      {t("stopCanceling")}
                    </Button>
                  ) : (
                    <Button onClick={handleLineCancel} color="error">
                      {t("cancelLine")}
                    </Button>
                  )}
                </Box>
                {currentPromotion ? (
                  <Box sx={{ mt: 1 }}>
                    <Typography color={"secondary.main"}>
                      {t("campaign2use")}
                    </Typography>
                    <Box
                      sx={{
                        mt: 1,
                        bgcolor: "customInput",
                        p: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {t(currentPromotion.title)}
                      <IconButton
                        onClick={() => setCurrentPromotion(null)}
                        color="error"
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  </Box>
                ) : null}
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
            summary={stage === 1 ? t("products") : t("invoice")}
            expanded={expand === "product"}
            onChange={() => handleAcordion("basket", "product")}
          >
            {stage === 1 ? (
              <AccordionProducts
                setSelectedProduct={setSelectedProduct}
                selectedProduct={selectedProduct}
                products={products}
                categories={categories}
              />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  padding: 1,
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    flexBasis: "100%",
                    flexDirection: "column",
                    display: "flex",
                    gap: 2,
                  }}
                >
                  <Button onClick={() => setShowEmailModal(true)}>
                    E-{t("invoce")}
                  </Button>
                  {customerEmail && <Typography>{customerEmail}</Typography>}
                  {showEMailModal ? (
                    <EMailModal
                      open={showEMailModal}
                      handleClose={() => setShowEmailModal(false)}
                    />
                  ) : null}
                </Box>

                <Divider />

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography>{t("subTotal")}:</Typography>
                    <Typography> {subTotal}</Typography>
                  </Box>

                  <Divider
                    light
                    sx={{ bgcolor: (theme) => theme.palette.secondary.main }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography>{t("total")}:</Typography>
                    <Typography> {total}</Typography>
                  </Box>
                  <Divider
                    light
                    sx={{ bgcolor: (theme) => theme.palette.primary.main }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography>{t("amountPaid")}:</Typography>
                    <Typography> {amountPaid}</Typography>
                  </Box>
                  <Divider
                    light
                    sx={{ bgcolor: (theme) => theme.palette.secondary.main }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography>{t("remainderOfMoney")}:</Typography>
                    <Typography> {payableAmount}</Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </CustomAccordion>

          <CustomAccordion
            expanded={expand === "basket"}
            onChange={() => handleAcordion("product", "basket")}
            summary={
              <Badge badgeContent={itemCount} color="primary">
                <ShoppingBasketIcon />
              </Badge>
            }
            contentSx={{ display: "flex", flexDirection: "column" }}
          >
            <Box sx={{ flexBasis: "100%", overflowX: "auto" }}>
              {cart.map((x) => (
                <Fragment key={x.id}>
                  <Box
                    sx={{
                      display: "flex",
                      bgcolor: "customInput",
                      paddingY: 2,
                      paddingX: 1,
                      gap: 3,
                      minHeight: 100,
                      alignItems: "center",
                      justifyContent: "space-between",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          borderRadius: 1,
                          objectFit: "",
                          height: 100,
                          width: 100,
                          flexBasis: 100,
                        }}
                        image={x.img_url}
                      />
                      <Box>
                        <Typography>{x.name}</Typography>
                        <Typography>{x.price}</Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      {isLineCancel ? (
                        <Fab
                          color="error"
                          onClick={() => {
                            removeFromCart(x);
                            if (itemCount - 1 === 0) {
                              setIsLineCancel(false);
                              setStage(1);
                            }
                          }}
                          sx={{ height: 35, width: 35 }}
                        >
                          <CloseIcon />
                        </Fab>
                      ) : (
                        <>
                          <Fab
                            disabled={x.count === 1}
                            onClick={() => decreaseProduct(x)}
                            sx={{ height: 35, width: 35 }}
                          >
                            <RemoveIcon />
                          </Fab>
                          <Typography>{x.count}</Typography>
                          <Fab
                            onClick={() => increaseProduct(x)}
                            sx={{ height: 35, width: 35 }}
                          >
                            <AddIcon />
                          </Fab>
                        </>
                      )}
                    </Box>
                  </Box>
                  <Divider />
                </Fragment>
              ))}
            </Box>
            <Box
              sx={{
                flexBasis: "60px",
                borderRadius: 1,
                backgroundColor: "primary.main",
                p: 1,
                color: "#fff",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <Typography>{t("subTotal")}:</Typography>
                <Typography> {subTotal}</Typography>
              </Box>

              <Divider
                light
                sx={{ bgcolor: (theme) => theme.palette.secondary.main }}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <Typography>{t("total")}:</Typography>
                <Typography> {total}</Typography>
              </Box>
            </Box>
          </CustomAccordion>
        </Box>
      </Box>

      <PromotionsModal
        handleClose={() => setShowPromotions(false)}
        open={showPromotions}
      />
      <ToastContainer />
    </ContainerDiv>
  );
}
