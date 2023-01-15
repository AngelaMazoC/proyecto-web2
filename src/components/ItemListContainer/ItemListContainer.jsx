import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../ItemList/ItemList";
import getItems, { getItemsByCategory } from "../../services/databaseProducts";

function ItemListContainer() {
  const [products, setProducts] = useState();
  const idCategory = useParams();

  async function getProducts() {
    if (Object.entries(idCategory).length === 0) {
      try {
        let response = await getItems();
        setProducts(response);
      } catch (error) {
        alert(error);
      }
    } else {
      let response = await getItemsByCategory(idCategory.categoryid);
      setProducts(response);
    }
  }
  useEffect(() => {
    getProducts();
  }, [idCategory]);

  return (
    <section className="Item__Content">
      <ItemList products={products} />
    </section>
  );
}

export default ItemListContainer;
