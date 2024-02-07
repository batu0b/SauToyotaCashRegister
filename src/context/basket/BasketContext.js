import { createContext, useContext } from "react";

export const BasketContext = createContext({
  cart: [],
  subTotal: 0,
  total: 0,
  promotions: [],
  currentPromotion: null,
  itemCount: null,
  amountPaid: 0,
  cardPayment: 0,
  cashPayment: 0,
  payableAmount: 0,
  customerEmail: "",
  addToCart: () => {},
  removeFromCart: () => {},
  deleteCart: () => {},
  decreaseProduct: () => {},
  increaseProduct: () => {},
  setCurrentPromotion: () => {},
  setCardPayment: () => {},
  setCashPayment: () => {},
  setPayableAmount: () => {},
  setCustomerEmail: () => {},
});

export const useBasketContext = () => useContext(BasketContext);
