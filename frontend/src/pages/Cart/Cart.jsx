import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";


const Cart = () => {
  const { cartItems, food_list, removeFromCart } = useContext(StoreContext);
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Mặt hàng</p>
          <p>Tiêu đề</p>
          <p>Giá</p>
          <p>Số lượng</p>
          <p>Tổng cộng</p>
          <p>Xóa</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id} className="cart-items-item">
                <img src = {item.image} alt=""/>
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>{item.price * cartItems[item._id]}</p>
                <p>x</p>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Cart;
