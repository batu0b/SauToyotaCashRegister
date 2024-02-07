import { useEffect, useState } from "react";
import { BasketContext } from "./BasketContext";
import { useAxios } from "../../hooks/useAxios";

export const BasketContexProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [currentPromotion, setCurrentPromotion] = useState(null);
  const [itemCount, setItemCount] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const [cashPayment, setCashPayment] = useState(0);
  const [cardPayment, setCardPayment] = useState(0);
  const [promotions, setPromotions] = useState(null);
  const [payableAmount, setPayableAmount] = useState(0);
  const [customerEmail, setCustomerEmail] = useState("");

  const { response, isLoading, error } = useAxios({
    url: "/promotions",
    method: "GET",
  });

  const calculateTotal = () => {
    switch (currentPromotion.type) {
      case "3for2": {
        let newtotal = subTotal;
        const cartItem = cart.find(
          (item) => item.id === currentPromotion.productId
        );
        if (cartItem && cartItem.count >= currentPromotion.requiredQuantity) {
          const itemPrice = parseFloat(cartItem.price);
          const discountedQuantity =
            Math.floor(cartItem.count / currentPromotion.requiredQuantity) *
            (currentPromotion.requiredQuantity -
              currentPromotion.discountedQuantity);
          const discountPrice = discountedQuantity * itemPrice;

          newtotal -= discountPrice;
        }
        return parseFloat(newtotal).toFixed(2);
      }
      case "discount":
        return (
          subTotal -
          (subTotal * currentPromotion.discountAmount) / 100
        ).toFixed(2);
      default:
        break;
    }
  };

  useEffect(() => {
    if (response?.data) {
      setPromotions(response?.data);
    }
  }, [response]);

  useEffect(() => {
    if (cart.length > 0) {
      setSubTotal(() =>
        cart
          .reduce(
            (toplam, cartItem) =>
              (toplam = toplam + cartItem.count * parseFloat(cartItem.price)),
            0
          )
          .toFixed(2)
      );
    } else {
      setSubTotal(parseFloat(0).toFixed(2));
      setCardPayment(0);
      setCashPayment(0);
    }
    setItemCount(cart.length);
  }, [cart]);

  useEffect(() => {
    if (!currentPromotion) {
      setTotal(subTotal);
    } else {
      const val = calculateTotal();
      setTotal(val);
    }
  }, [subTotal, currentPromotion]);

  useEffect(() => {
    setAmountPaid((cardPayment + cashPayment).toFixed(2));
  }, [cardPayment, cashPayment]);

  useEffect(() => {
    setPayableAmount((total - amountPaid).toFixed(2));
  }, [amountPaid, total]);

  const addToCart = (product, count) => {
    setCart((prev) =>
      cart.find((cartItem) => cartItem.id === product.id)
        ? cart.map((cartItem) =>
            cartItem.id === product.id
              ? { ...cartItem, count: cartItem.count + (count || 1) }
              : cartItem
          )
        : [...cart, { ...product, count: count }]
    );
  };

  const deleteCart = () => {
    setCart([]);
  };

  const removeFromCart = (product) => {
    setCart((prev) => prev.filter((x) => x.id !== product.id));
  };

  const decreaseProduct = (product) => {
    setCart((prev) =>
      prev.map((cartItem) =>
        cartItem.id === product.id
          ? {
              ...cartItem,
              count: cartItem.count > 1 ? cartItem.count - 1 : 1,
            }
          : cartItem
      )
    );
  };

  const increaseProduct = (product) => {
    setCart((prev) =>
      prev.map((cartItem) =>
        cartItem.id === product.id
          ? {
              ...cartItem,
              count: cartItem.count + 1,
            }
          : cartItem
      )
    );
  };

  return (
    <BasketContext.Provider
      value={{
        cart,
        addToCart,
        deleteCart,
        removeFromCart,
        decreaseProduct,
        increaseProduct,
        subTotal,
        total,
        promotions,
        currentPromotion,
        setCurrentPromotion,
        itemCount,
        amountPaid,
        cashPayment,
        cardPayment,
        setCardPayment,
        setCashPayment,
        setPayableAmount,
        payableAmount,
        setCustomerEmail,
        customerEmail,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
