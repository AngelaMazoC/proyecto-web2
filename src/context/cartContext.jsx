import React, { createContext, useEffect, useState } from "react";
import { getRatingsByUserId, } from '../services/firebase';
import { useAuthContext } from "./AuthContext";



export const cartContext = createContext();

export function CartContextProvider(props) {
  const [cart, setCart] = useState([]);
  
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

  //eliminar items del carrito 
  const onDelete = (product) => {
    const newCart = [...cart]
    const deleteCart = newCart.filter((item) => item.id !== product.id);
    setCart(deleteCart)
  } 

  const value = { cart, setCart, addItem, getTotalItems, onDelete };
  return (
    <cartContext.Provider value={value}>{props.children}</cartContext.Provider>
  );
}
