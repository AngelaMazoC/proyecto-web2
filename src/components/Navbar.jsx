import React from "react";
import "../assets/styles/Navbar.css";

function Navbar() {
  return (
    <>
      <div className="Navbar__Content">
        <div className="Navabar__Logo">
          <span>MYGADGETSTORE</span>
        </div>
        <nav className="Navbar">
          <ul className="Navbar__Items">
            <li>Tecnologia</li>
            <li>Hogar</li>
            <li>Belleza</li>
            <li>Juguetes</li>
          </ul>
          <div className="Navbar__Cart">
            <i className="fa-solid fa-cart-shopping" />
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
