import React from "react";
import "./Item.css";

function Item({ id, name, price, detail, imgurl, category }) {
  return (
    <div className="Item">
      <div className="Item__Card--Img">
        <img src={imgurl} alt="Pc" />
      </div>
      <div className="Item__Card--Detail">
        <span className="Item__Card--Name">{name}</span>
        <span className="Item__Card--Price">${new Intl.NumberFormat().format(price)}</span>
      </div>
    </div>
  );
}

export default Item;
