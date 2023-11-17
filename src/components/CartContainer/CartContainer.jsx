import React, { useContext } from "react";
import { cartContext } from "../../context/cartContext";
import { useAuthContext } from "../../context/AuthContext";
import { savePurchase } from "../../services/firebase";

import "./CartContainer.css";
import { Link, useNavigate } from "react-router-dom";

function CartContainer() {
  const { cart, setCart, onDelete } = useContext(cartContext);
  const { user } = useAuthContext();
  const navigateTo = useNavigate();

  const totalPurchased = () => {
    const suma = cart.reduce((acumulador, value) => {
      return acumulador + value.price * value.count;
    }, 0);
    const result = new Intl.NumberFormat().format(suma);
    return result;
  };

  const completePurchase = async () => {
    if (user) {
      // Solo intenta guardar la compra si el usuario está autenticado
      await savePurchase(user.uid, cart);
      setCart([]);
      alert("Gracias por tu compra");
      navigateTo("/");
    } else {
      // Muestra alerta si el usuario no está autenticado
      alert("Debes iniciar sesión antes de completar la compra.");
    }
  };

  if (cart.length !== 0) {
    return (
      <div className="Cart">
        <div className="Cart__Container">
          <table className="Cart__Table">
            <thead className="Cart__Title">
              <tr className="Cart__Title--values">
                <th className="col item">Productos</th>
                <th className="col price">Precio</th>
                <th className="col qty">Cantidad</th>
                <th className="col total">Total</th>
                <th className="col total">Accion</th>
              </tr>
            </thead>
            <tbody className="Cart__Table--content">
              {cart?.map((item) => (
                <tr className="Cart__Table--content-value" key={item.id}>
                  <td className="cont info">
                    <Link to={`/item/${item.id}`}>
                      <img
                        src={item.imgurl}
                        alt="product"
                        width="75"
                        height="97"
                      />
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
                  <td className="cont qty">
                    <span>{item.count}</span>
                  </td>
                  <td className="cont total">
                    ${new Intl.NumberFormat().format(item.price * item.count)}
                  </td>
                  <td className="cont delete" onClick={() => onDelete(item)}>
                    Eliminar
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="Cart__Total">
            <div className="Cart__Total--container">
              <h1 className="Cart__Total--title">RESUMEN DE COMPRA</h1>
              <div className="Total__Container">
                <span>Subtotal</span>
                <span className="Total__Container-sub">
                  {" "}
                  ${totalPurchased()}
                </span>
              </div>
              <div className="Total__Container">
                <span>Envío</span>
                <span className="Total__Container-env">Gratis</span>
              </div>
              <div className="Total__Container">
                <span>Precio</span>
                <span className="Total__Container-total">
                  ${totalPurchased()}
                </span>
              </div>
              <button className="Finalize__Purchase" onClick={completePurchase}>
                Finalizar compra
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Cart">
        <span className="Cart__Empty">El carrito esta vacio 😢</span>
      </div>
    );
  }
}

export default CartContainer;
