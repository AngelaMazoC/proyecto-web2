import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ItemList from "./components/ItemList";
import Items from "./components/Items";

function App() {
  return (
    <>
      <Navbar />
      <ItemList>
        <Items />
      </ItemList>
    </>
  );
}
export default App;
