import React, { useContext } from 'react'; // Import useContext
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { useState } from 'react';

const PlaceOrder = () => {
const {getTotalCartAmount,token,food_list,cartItems,url}= useContext(StoreContext);
const [data,setData]= useState({
  firstName:"",
  lastName:"",
  email:"",
  street:"",
  city:"",
  state:"",
  zipcode:"",
  country:"",
  phone:""
})
const onChangeHandler =(event) =>{
  const name= event.target.name;
  const value = event.target.value;
  setData(data=>({...data,[name]:value}))
}
  return (
    <form className ='place-order'>
      <div className="place-order-left">
     <p className="title">  <table>Thông tin giao hàng</table></p>
     <div className="multi-fields">
      <input name='firstName' onChange={onChangeHandler } value={data.firstName} type="text" placeholder='Họ'/>

      <input name='lastName' onChange={onChangeHandler } value={data.lastName} type="text" placeholder='Tên'/>

     </div>
     <input name='email' onChange={onChangeHandler } value={data.email} type="email" placeholder='Địa chỉ email'/>
     <input name='street' onChange={onChangeHandler } value={data.street} type="text " placeholder='Street'/>
       <div className="multi-fields">
      <input name='city' onChange={onChangeHandler } value={data.city} type="text" placeholder='Thành phố'/>

      <input name='state' onChange={onChangeHandler } value={data.state} type="text" placeholder='địa vị'/>

     </div>
     <div className="multi-fields">
      <input name='zipcode' onChange={onChangeHandler } value={data.zipcode} type="text" placeholder='Mã bưu điện'/>

      <input name='country' onChange={onChangeHandler } value={data.country} type="text" placeholder='Quốc gia'/>

     </div>
     <input name='phone' onChange={onChangeHandler } value={data.phone} type="text " placeholder='Phone'/>
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
