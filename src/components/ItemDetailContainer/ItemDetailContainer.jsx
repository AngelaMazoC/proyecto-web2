import React, { useState, useEffect, useContext } from "react";
import { getSingleItem } from "../../services/databaseProducts";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ItemCount from "../ItemCount/ItemCount";
import { cartContext } from "../../context/cartContext";

import "./ItemDetail.css";

function ItemDetailContainer() {
  const [product, setProduct] = useState({});
  const { addItem, getTotalItems } = useContext(cartContext);
  let { itemId } = useParams();

  const notify = () =>
    toast.success(`Has agregado ${product.name} al carrito`, {
      position: toast.POSITION.TOP_RIGHT,
    });

  function handleAddToCart(count) {
    const newProduct = { ...product };
    setProduct({ ...newProduct, count: count });
    notify();
  }

  const onValidateStock = (quantityToAdd) => {
    if (quantityToAdd >= product.stock) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (product.count) {
      addItem(product);
      getTotalItems(product.count);
    }
  }, [product]);

  useEffect(() => {
    getSingleItem(itemId)
      .then((respuesta) => {
        setProduct(respuesta);
      })
      .catch((error) => alert(`Error: ${error}`));
  }, []);
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
      </div>
      <ToastContainer autoClose={2000} />;
    </div>
  );
}

export default ItemDetailContainer;
