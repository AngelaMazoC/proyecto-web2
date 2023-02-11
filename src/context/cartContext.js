import React, { createContext, useState } from "react";

export const cartContext = createContext();

export function CartContextProvider(props) {
  let [cart, setCart] = useState([]);

  function addItem(item) {
    const isInCart = cart.some((itemInCart) => itemInCart.id === item.id);
    if (isInCart) {
      const addCart = cart.map((value) => {
        let newCart = value;
        if (value.id === item.id) {
          newCart = { ...value, count: item.count + value.count };
        }
        return newCart;
      });
      setCart(addCart);
    } else {
      setCart([...cart, item]);
    }
  }

  function getTotalItems() {
    let total = 0;
    cart.forEach((item) => (total += 1));
    return total;
  }

  const value = { cart, addItem, getTotalItems };
  return (
    <cartContext.Provider value={value}>{props.children}</cartContext.Provider>
  );
}
