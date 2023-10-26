import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { cartContext } from "../../context/cartContext";

import { getSingleItem } from "../../services/firebase";
import { ItemDetail } from "../ItemDetail/ItemDetail";

import "./ItemDetail.css";

function ItemDetailContainer() {
  const [product, setProduct] = useState({});
  const { addItem, getTotalItems } = useContext(cartContext);
  let { itemId } = useParams();

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
    <>
      <ItemDetail product={product} setProduct={setProduct} />
    </>
  );
}

export default ItemDetailContainer;
