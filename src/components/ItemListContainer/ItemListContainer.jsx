import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../ItemList/ItemList";
import { getItems, getItemsByCategory } from "../../services/firebase";

function ItemListContainer() {
  const [products, setProducts] = useState([]);
  let { categoryid } = useParams();

  async function getProducts() {
    if (!categoryid) {
      try {
        let response = await getItems();
        setProducts(response);
      } catch (error) {
        alert(error);
      }
    } else {
      let response = await getItemsByCategory(categoryid);
      setProducts(response);
    }
  }

  useEffect(() => {
    getProducts();
  }, [categoryid]);


  return (
    <section className="Item__Content">
      <ItemList products={products} />
    </section>
  );
}

export default ItemListContainer;
