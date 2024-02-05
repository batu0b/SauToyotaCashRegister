import { createContext, useContext } from "react";

export const BasketContext = createContext({
  cart: [],
  subTotal: 0,
  total: 0,
  promotions: [],
  currentPromotion: null,
  addToCart: () => {},
  removeFromCart: () => {},
  deleteCart: () => {},
  decreaseProduct: () => {},
  increaseProduct: () => {},
  setCurrentPromotion: () => {},
});

export const useBasketContext = () => useContext(BasketContext);
