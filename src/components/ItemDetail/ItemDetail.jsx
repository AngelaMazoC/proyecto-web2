import React from "react";
import { ToastContainer, toast } from "react-toastify";

import ItemCount from "../ItemCount/ItemCount";

import "react-toastify/dist/ReactToastify.css";

export const ItemDetail = ({ product, handleAddToCart, setProduct }) => {
  const onValidateStock = (quantityToAdd) => {
    if (quantityToAdd >= product.stock) {
      return false;
    } else {
      return true;
    }
  };

  function handleAddToCart(count) {
    const newProduct = { ...product };
    setProduct({ ...newProduct, count: count });
    notify();
  }

  const notify = () => {
    toast.success(`Has agregado ${product.name} al carrito`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <div className="Detail__Content">
      <div className="Detail__Item--img">
        <img src={product.imgurl} alt="" />
      </div>
      <div className="Detail__Item--info">
        <span className="Detail__Item--Marca">{product.marca}</span>
        <span className="Detail__Item--Name">{product.detail}</span>
        <span className="Detail__Item--Price">
          ${new Intl.NumberFormat().format(product.price)}
        </span>
        <ItemCount
          onAddToCart={handleAddToCart}
          onValidateStock={onValidateStock}
        />
        <ToastContainer autoClose={2000} />
      </div>
    </div>
  );
};
