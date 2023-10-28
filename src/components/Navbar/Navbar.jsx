import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import getLinks from "../../services/databaseLinks";
import "./Navbar.css";
import { cartContext } from "../../context/cartContext";
import Authentication from "../FormLogin/Authentication";

function Navbar() {
  const [links, setLinks] = useState([]);

  const { getTotalItems } = useContext(cartContext);

  useEffect(() => {
    getLinks().then((respuesta) => {
      setLinks(respuesta);
    });
  }, []);
  
  return (
    <>
      <div className="Navbar__Content">
        <div className="Navabar__Logo">
          <Link to={"/"}>
            <span>MYGADGETSTORE</span>
          </Link>
        </div>
        <nav className="Navbar">
          <ul className="Navbar__Items">
            <li className="Navbar__Link">
              <Link to={"/"}>Inicio</Link>
            </li>
            {links?.map((link) => (
              <li className="Navbar__Link" key={link.id}>
                <Link to={link.url}>{link.name}</Link>
              </li>
            ))}
          </ul>
          <div className="Navbar__Cart">
            <Link to={"/cart"}>
              <i className="fa-solid fa-cart-shopping" />
              <div className="Navbar__Cart--count">{getTotalItems()}</div>
            </Link>
          </div>
          <div className="LoginContent">
            <div>🧑</div>
            <Authentication />
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
