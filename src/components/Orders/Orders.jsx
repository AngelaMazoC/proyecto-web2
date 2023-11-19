import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { getOrdersByUserId, getSingleItem } from '../../services/firebase';
import './Orders.css';

const Orders = () => {
  const [orderItems, setOrderItems] = useState([]);
  const { user } = useAuthContext();
  const nombre = user?.displayName?.split(' ');

  useEffect(() => {
    getOrders();
  }, [user]);

  const getOrders = async () => {
    try {
      // Verificar si hay un usuario
      if (!user) {
        return;
      }

      // Obtener las órdenes del usuario
      const orders = await getOrdersByUserId(user.uid);

      // Obtener detalles de productos para cada orden
      const items = await Promise.all(
        orders.map(async (order) => {
          const itemDetails = await Promise.all(
            order.items.map(async (item) => ({
              ...item,
              product: await getSingleItem(item.productId)
            }))
          );
          return { ...order, items: itemDetails };
        })
      );

      // Actualizar el estado con la información obtenida
      setOrderItems(items);
      console.log('orderItems:', items);
    } catch (error) {
      console.error('Error al obtener las órdenes:', error);
    }
  };

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
            <div key={order.id} className="Items">
              <span>{order.timestamp.toDate().toLocaleDateString()}</span>
              {order.items.map((item) => (
                <div key={item.product.id}>
                  {/* <img src={item.product.imgurl} alt={item.product.name} /> */}
                  <div>
                    <span>{item.product.name}</span>
                    <span>Cantidad: {item.quantity}</span>
                    <span>Total: {item.totalPrice}</span>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;