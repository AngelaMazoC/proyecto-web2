import React from "react";

function ItemList(props) {
  return (
    <section className="Item__Content">
      <ul>{props.children}</ul>
    </section>
  );
}

export default ItemList;
