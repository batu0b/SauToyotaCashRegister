import { useEffect, useState } from "react";
import { BasketContext } from "./BasketContext";

export const BasketContexProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (cart.length > 0) {
      setTotal(() =>
        cart.reduce(
          (toplam, cartItem) =>
            (toplam = toplam + cartItem.count * parseFloat(cartItem.price)),
          0
        )
      );
    }
  }, [cart]);

  useEffect(() => {
    setSubTotal(total);
  }, [total]);

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
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
