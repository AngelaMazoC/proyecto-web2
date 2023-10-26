import React from "react";
import Item from "../Item/Item";

import "./ItemList.css";

function ItemList(props) {
  return (
    <div className="Item__Content--list">
      <div className="Item__Card">
        {props.products?.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            detail={item.detail}
            imgurl={item.imgurl}
          />
        ))}
      </div>
    </div>
  );
}

export default ItemList;
