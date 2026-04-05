import React, { useContext } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "", lastName: "", email: "", street: "", city: "", state: "", zipcode: "", country: "", phone: ""
  })
  const [savedAddresses, setSavedAddresses] = useState([]);

  useEffect(() => {
    if (token) {
      axios.post(url + "/api/address/get", {}, { headers: { token } })
        .then(res => {
          if (res.data.success) {
            setSavedAddresses(res.data.data);
          }
        }).catch(err => console.error(err));
    }
  }, [token]);

  const handleSelectAddress = (e) => {
    if (!e.target.value) return;
    const selected = savedAddresses.find(a => a._id === e.target.value);
    if (selected) {
      setData({
        firstName: selected.firstName, lastName: selected.lastName, email: selected.email,
        street: selected.street, city: selected.city, state: selected.state,
        zipcode: selected.zipcode, country: selected.country, phone: selected.phone
      });
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }
  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,

    }
    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    }
    else {
      alert("error");
    }
    const navigate = useNavigate();
    useEffect(() => {
      if (!token) {
        navigate('/cart')

      } else if (getTotalCartAmount() === 0) {
        navigate('/cart')
      }
    }, [token])
  }
  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title"> Thông tin giao hàng</p>

        {savedAddresses.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <select onChange={handleSelectAddress} style={{ padding: '10px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}>
              <option value="">-- Chọn địa chỉ đã lưu --</option>
              {savedAddresses.map(addr => (
                <option key={addr._id} value={addr._id}>
                  {addr.firstName} {addr.lastName} - {addr.street}, {addr.city}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='Họ' />

          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Tên' />

        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Địa chỉ email' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text " placeholder='Street' />
        <div required className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='Thành phố' />

          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='địa vị' />

        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Mã bưu điện' />

          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Quốc gia' />

        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text " placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Tổng số giỏ hàng:</h2>
          <div>
            <div className="cart-total-details">
              <p>Tổng phụ</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Phí giao hàng</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Tổng số</p>
              <p>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
            </div>

          </div>
          <button type='submit' > Thanh toán</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
