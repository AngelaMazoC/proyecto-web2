import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./ItemCount.css";

function ItemCount({ onAddToCart, onValidateStock }) {
  const [count, setCount] = useState(1);
  const handleSubstract = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAdd = () => {
    if (onValidateStock(count)) {
      setCount(count + 1);
    }
  };

  return (
    <div className="Item__Count">
      <small className="Item__Count--cant">Cant:</small>
      <div className="Item__Count--content">
        <button className="Item__Count--btn" onClick={handleSubstract}>
          {" "}
          -{" "}
        </button>
        <input
          className="Item__Count--txt"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <button className="Item__Count--btn" onClick={handleAdd}>
          {" "}
          +{" "}
        </button>
      </div>
      <div className="Item__Count--add">
        <button type="button" onClick={() => onAddToCart(count)}>
          AGREGAR AL CARRITO
        </button>
      </div>
    </div>
  );
}

export default ItemCount;
