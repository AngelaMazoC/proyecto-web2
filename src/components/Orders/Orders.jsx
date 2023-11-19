import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../context/AuthContext';

import { getOrdersByUserId, saveRating } from '../../services/firebase';
import { toast } from 'react-toastify';

import './Orders.css';
import Rating from './Rating';

const Orders = () => {
  const [orderItems, setOrderItems] = useState([]);
  const { user, userRatings, getRatings } = useAuthContext();
  const nombre = user?.displayName?.split(' ');

  const navigate = useNavigate();

  useEffect(() => {
    getOrders();
    getRatings();
  }, [user]);

  const getOrders = async () => {
    try {
      // Verificar si hay un usuario
      if (!user) {
        return;
      }
      // Obtener las órdenes del usuario
      const orders = await getOrdersByUserId(user.uid);
      setOrderItems(orders);

    } catch (error) {
      console.error('Error al obtener las órdenes:', error);
    }
  };

  const sendRating = (rating, productId, idUser) => {
    saveRating(rating, productId, idUser);
    toast("Has calificado el producto");
    setTimeout(() => {
      navigate(0);
    }, 2000);
  }

  if (!orderItems) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="OrdersContent">
      <div className="OrdersUser">
        <h1>{nombre && nombre[0]}!</h1>
        <span>Descubre lo que has Comprado</span>
      </div>
      <div className="OrderItems">
        {orderItems.length === 0 ? (
          <p>No hay órdenes disponibles.</p>
        ) : (
          orderItems.map((order) => (
            order.items.map((item) => (
              <div key={item.productId} className="Items">
                <span className='ItemDate'>{order.timestamp.toDate().toLocaleDateString()}</span>
                <div className='ItemContent'>
                  {/* <img src={item.productImg} alt={item.name} /> */}
                  <div className='ItemInfo'>
                    <span className='ItemName'>{item.name}</span>
                    <span className='ItemCant'>Cantidad: {item.quantity}</span>
                    <span className='ItemTotal'>Total:  ${new Intl.NumberFormat().format(item.totalPrice)}</span>
                  </div>
                  <div className='ItemsRating'>
                    {
                      <Rating
                        sendRating={sendRating}
                        item={item}
                        user={user}
                        key={item.productId}
                        userRatings={userRatings}
                      />
                    }
                  </div>
                </div>
              </div>
            ))
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;