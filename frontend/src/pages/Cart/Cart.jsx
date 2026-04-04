import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url, applyPromotion, getDiscountAmount, discountData } = useContext(StoreContext);
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");

  const handleApplyPromo = async () => {
    if (!promoCode) return;
    const res = await applyPromotion(promoCode);
    if(res.success) {
        alert("Áp dụng thành công Voucher: " + promoCode); // Có thể thay bằng toast
    } else {
        alert("Lỗi: " + res.message); 
    }
  };

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
          const itemQuantity = cartItems[item._id];
          if (itemQuantity > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={`${url}/images/${item.image}`} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price.toFixed(2)}</p>
                  <p>{itemQuantity}</p>
                  <p>${(item.price * itemQuantity).toFixed(2)}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Tổng số giỏ hàng:</h2>
          <div>
            <div className="cart-total-details">
              <p>Tổng phụ</p>
              <p>${getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Phí giao hàng</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            {discountData && (
              <>
                <div className="cart-total-details">
                  <p>Giảm giá ({discountData.code})</p>
                  <p className="text-success" style={{color: 'green'}}>- ${getDiscountAmount().toFixed(2)}</p>
                </div>
                <hr />
              </>
            )}
            <div className="cart-total-details">
              <p>Tổng số</p>
              <p>${getTotalCartAmount() === 0 ? 0 : (getTotalCartAmount() + 2 - getDiscountAmount()).toFixed(2)}</p>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>Tiến hành thanh toán</button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>Nếu bạn có mã khuyến mãi, hãy nhập mã đó vào đây.</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='Nhập mã ở đây' value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
              <button onClick={handleApplyPromo}>Áp dụng</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;