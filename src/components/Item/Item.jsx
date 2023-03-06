import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

function Item({ id, name, price, imgurl }) {
  const urlDetail = `/item/${id}`;

  return (
    <div className="Item">
      <Link to={urlDetail}>
        <div className="Item__Card--Img">
          <img src={imgurl} alt="Pc" />
        </div>
      </Link>
      <div className="Item__Card--Detail">
        <Link to={urlDetail}>
          <span className="Item__Card--Name">{name}</span>
        </Link>
        <span className="Item__Card--Price">
          ${new Intl.NumberFormat().format(price)}
        </span>
      </div>
    </div>
  );
}

export default Item;
