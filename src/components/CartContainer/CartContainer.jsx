import React, { useContext } from "react";
import { cartContext } from "../../context/cartContext";

import "./CartContainer.css";
import { Link } from "react-router-dom";

function CartContainer() {
  const { cart } = useContext(cartContext);
  return (
    <div className="Cart">
      <table className="Cart__Table">
        <thead className="Cart__Title">
          <tr className="Cart__Title--values">
            <th className="col item">Productos</th>
            <th className="col price">Precio</th>
            <th className="col qty">Cantidad</th>
            <th className="col total">Total</th>
          </tr>
        </thead>
        <tbody className="Cart__Table--content">
          {cart?.map((item) => (
            <tr className="Cart__Table--content-value" key={item.id}>
              <td className="cont info">
                <Link to={`/item/${item.id}`}>
                  <img src={item.imgurl} alt="product" width="75" height="97" />
                </Link>
                <div className="product-info">
                  <span className="product-info-name">{item.name}</span>
                  <span className="product-info--id">
                    <strong>ID: </strong>
                    {item.id}
                  </span>
                </div>
              </td>
              <td className="cont price">
                ${new Intl.NumberFormat().format(item.price)}
              </td>
              <td className="cont qty">{item.count}</td>
              <td className="cont total">
                ${new Intl.NumberFormat().format(item.price * item.count)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CartContainer;
