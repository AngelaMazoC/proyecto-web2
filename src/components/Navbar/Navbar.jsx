import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getLinks from "../../services/databaseLinks";
import "./Navbar.css";

function Navbar() {
  const [links, setLinks] = useState([]);

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
              <Link to={"/"}>
                Inicio
              </Link>
            </li>
            {
              links?.map((link) => (
                <li className="Navbar__Link" key={link.id}>
                  <Link to={link.url}>
                    {link.name}
                  </Link>
                </li>
              ))
            }
          </ul>
          <div className="Navbar__Cart">
            <i className="fa-solid fa-cart-shopping" />
          </div>
        </nav>
      </div >
    </>
  );
}

export default Navbar;
