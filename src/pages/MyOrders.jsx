import React, { useEffect, useState } from "react";
import "../styles/MyOrders.css";
import api from "../api/api";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders');
        const ordersData = response.data.data !== undefined ? response.data.data : response.data;
        setOrders(Array.isArray(ordersData) ? ordersData : []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div style={{padding: '20px'}}>Loading orders...</div>;
  if (error) return <div style={{padding: '20px', color: 'red'}}>Error: {error}</div>;

  return (
    <div className="product-container">
      <h1 className="heading">My Orders</h1>

      {orders.length === 0 ? (
        <p>You have no past orders.</p>
      ) : (
        <div className="product-grid">
          {orders.map((order) => {
            const firstItem = order.items && order.items.length > 0 ? order.items[0] : null;
            const fallbackImage = "https://cdn-icons-png.flaticon.com/512/1008/1008010.png";

            return (
              <div className="product-card" key={order.id}>
                <img 
                  src={firstItem?.bookImageUrl || fallbackImage} 
                  alt="Order item" 
                  className="product-img" 
                />
                
                <h3 className="product-title">Order #{order.id}</h3>
                <p className="product-genre">{new Date(order.orderDate).toLocaleDateString()}</p>
                <p className="product-genre" style={{ color: order.status === 'COMPLETED' ? 'green' : 'orange', fontWeight: 'bold' }}>
                  {order.status || 'PENDING'}
                </p>
                <p className="product-price">Rs. {order.totalAmount}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyOrders;
