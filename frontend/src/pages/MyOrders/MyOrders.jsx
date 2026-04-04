import React, { useState, useContext, useEffect } from 'react';
import './MyOrders.css';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);

  const fetchOrders = async () => {
    if (!token) return;

    try {
      // Use the header format your backend expects:
      // If backend reads req.headers.token:
      const headers = { token };
      // If backend expects Authorization: Bearer <token>, use:
      // const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.post(`${url}/api/order/userorders`, {}, { headers });
      if (response?.data?.data) {
        setData(response.data.data);
      } else {
        setData([]);
        console.warn('No orders returned', response?.data);
      }
    } catch (err) {
      console.error('fetchOrders error:', err);
      setData([]);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((order, index) => {
            const key = order._id || order.id || index;
            const itemsText = Array.isArray(order.items)
              ? order.items.map((it) => `${it.name} x ${it.quantity ?? 1}`).join(', ')
              : 'No items';

            // Ensure amount is displayed as integer with .00
            const amountDisplay =
              typeof order.amount === 'number' ? `${order.amount}.00` : `${order.amount || 0}.00`;

            const status = order.status || 'pending';

            return (
              <div key={key} className="my-orders-order">
                <img src={assets.parcel_icon} alt="parcel icon" />
                <p className="order-items">{itemsText}</p>

                <p className="order-amount">${amountDisplay}</p>
                <p className="order-count">Items: {Array.isArray(order.items) ? order.items.length : 0}</p>
                <p className="order-status">
                  <span style={{ color: '#4caf50', marginRight: 6 }}> &#x25cf;</span>
                  <b>{status === 'Out for delivery' ? 'Đang giao hàng' : status}</b>
                </p>

                {status === 'Out for delivery' && (
                  <div className="driver-info" style={{marginTop: '10px', fontSize: '13px', color: '#555', backgroundColor: '#e8f5e9', padding: '10px', borderRadius: '5px', border: '1px solid #c8e6c9'}}>
                    <b style={{color: '#2e7d32'}}>🛵 Nhận diện Shipper:</b><br/>
                    <b>Tên:</b> Nguyễn Văn A <br/>
                    <b>SĐT:</b> 0909123456 <br/>
                    <b>Xe:</b> Honda Wave (59A1-12345)
                  </div>
                )}

                <button onClick={fetchOrders} className="track-btn">Theo dõi đơn hàng</button>
              </div>
            );
          })
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;