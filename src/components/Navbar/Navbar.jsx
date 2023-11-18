import React, { useState, useEffect, useContext } from "react";
import { useAuthContext } from '../../context/AuthContext';
import { cartContext } from "../../context/cartContext";

import { Link } from "react-router-dom";

import getLinks from "../../services/databaseLinks";
import { ToastContainer, toast } from "react-toastify";

import "./Navbar.css";

function Navbar() {
  const [links, setLinks] = useState([]);
  const [showBoxLogin, setShowBoxLogin] = useState(false);
  const { getTotalItems } = useContext(cartContext);

  const {
    loginWithGoogle,
    logout,
    user
  } = useAuthContext();

  const nombre = user?.displayName?.split(" ")

  const handleLogin = () => {
    loginWithGoogle();
    setShowBoxLogin(false);
  }

  const sesionClose = () => {
    logout();
    setShowBoxLogin(false);
    toast("Has cerrado sesión");

  }

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
            <span>TECH NEST</span>
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
          <div className="LoginContent" >
            {
              user === ''
                ?
                <i className="fa-solid fa-user" onClick={() => setShowBoxLogin(!showBoxLogin)} />
                :
                <span onClick={() => setShowBoxLogin(!showBoxLogin)}>{`Hola ${nombre[0]}`}</span>
            }

            <div className="BoxLogin" data-show={showBoxLogin}>
              {
                user ?
                  <div className="BoxIsLogin">
                    <Link to={"/myorders"} className="Orders">Mis compras</Link>
                    <span className="SesionClose" onClick={sesionClose}>Cerrar sesión</span>
                  </div>
                  :
                  <span className="buttonLogin" onClick={handleLogin}>Iniciar Sesion</span>
              }
            </div>

          </div>
          <div className="Navbar__Cart">
            <Link to={"/cart"}>
              <i className="fa-solid fa-cart-shopping" />
              <div className="Navbar__Cart--count">{getTotalItems() === 0 ? '' : getTotalItems()}</div>
            </Link>
          </div>
        </nav>
      </div>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default Navbar;
