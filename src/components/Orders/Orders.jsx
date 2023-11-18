import React, { useEffect, useState } from 'react'

import { useAuthContext } from "../../context/AuthContext";
import { getOrdersByUserId } from "../../services/firebase";

import "./Orders.css"

const Orders = () => {

  const [order, setOrder] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    if (user) {
      try {
        const response = await getOrdersByUserId(user.uid);
        setOrder(response);
      } catch (error) {
        alert(error);
      }
    }
  }


  return (
    <div className='OrdersContent'>
      <div className='OrdersUser'>
        <h2>Hola Andres</h2>
        <span>Estas son tus compras</span>
      </div>
      <div className='OrderItems'>
        {order?.map(data => (
          <div className='Items'>
            <img src="" alt="" />
            <div>
              {/* <span>10 de septiembre</span> */}
              <span>{data.id}</span>
              <span>{data.userEmail}</span>
              <span>{data.userName}</span>
            </div>
            <div>
              <small>calificacion</small>
              ⭐⭐⭐⭐⭐
            </div>
          </div>
        ))}
      </div>


    </div>
  )
}

export default Orders