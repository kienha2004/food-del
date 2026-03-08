import React, { useContext } from 'react'; // Import useContext
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';

const PlaceOrder = () => {
const {getTotalCartAmount}= useContext(StoreContext);
  return (
    <form className ='place-order'>
      <div className="place-order-left">
     <p className="title">  <table>Thông tin giao hàng</table></p>
     <div className="multi-fields">
      <input type="text" placeholder='Họ'/>

      <input type="text" placeholder='Tên'/>

     </div>
     <input type="email" placeholder='Địa chỉ email'/>
     <input type="text " placeholder='Street'/>
       <div className="multi-fields">
      <input type="text" placeholder='Thành phố'/>

      <input type="text" placeholder='địa vị'/>

     </div>
     <div className="multi-fields">
      <input type="text" placeholder='Mã bưu điện'/>

      <input type="text" placeholder='Quốc gia'/>

     </div>
     <input type="text " placeholder='Phone'/>
      </div>
      <div className="place-order-right">
          <div className="cart-total">
          <h2>Tổng số giỏ hàng:</h2>
          <div>
              <div className="cart-total-details">
              <p>Tổng phụ</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
<p>Phí giao hàng</p>
<p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
<p>Tổng số</p>
<p>{getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
            </div>
            
          </div>
          <button> Thanh toán</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
