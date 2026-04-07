import React from 'react'
import './Orders.css'
import { useState } from 'react'
import {toast} from "react-toastify"
import { useEffect } from 'react'
import axios from "axios"
import { assets } from '../../assets/assets'
const Orders = ({url}) => {
  const[orders,setOrders]=  useState([]);
  const[drivers,setDrivers]= useState([]);

  const fetchDrivers = async () => {
    const response = await axios.get(url + "/api/driver/list");
    if (response.data.success) {
      setDrivers(response.data.data);
    }
  }

  const fetchAllOrders = async()=>{
 const response = await axios.get(url+"/api/order/list");
if (response.data.success) {
  setOrders(response.data.data);
  console.log(response.data.data);
  
} else{
  toast.error("error")
}
  }
  const statusHandler = async (event,orderId)=>{
  const response = await axios.post(url+"/api/order/status",{
    orderId,
    status:event.target.value
  })
  if(response.data.success){
    await fetchAllOrders();
  }
  }

  const assignDriverHandler = async (event, orderId) => {
    const driverId = event.target.value;
    const driverName = event.target.options[event.target.selectedIndex].text;
    
    const response = await axios.post(url + "/api/order/assign", {
      orderId,
      driverId,
      driverName: driverId ? driverName : ""
    });
    
    if (response.data.success) {
      toast.success(response.data.message);
      await fetchAllOrders();
      await fetchDrivers(); // Refresh driver status
    } else {
      toast.error(response.data.message);
    }
  }

  const removeOrder = async (orderId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này không?")) {
      try {
        const response = await axios.post(url + "/api/order/remove", { orderId });
        if (response.data.success) {
          toast.success(response.data.message);
          await fetchAllOrders();
        } else {
          toast.error("Lỗi khi xóa đơn hàng");
        }
      } catch (error) {
        toast.error("Không thể kết nối API xóa");
      }
    }
  };
  useEffect(()=>{
    fetchAllOrders();
    fetchDrivers();
  },[])
  
  return (
    <div className='order add'>
      <h3>Trang đặt hàng</h3>
      <div classname="oerder-list">
        {orders.map((order,index)=>(
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt=""/> 
            <div>
              <p className='order-item-food'>
      {order.items.map((item,index)=>{
        if (index===order.items.length-1) {
          return item.name + " x " + item.quantity          
        } else {
          return item.name + " x " + item.quantity + ", "
        }
      })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " "+ order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street+" , "}</p>
                <p>{order.address.city+", " +order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
              </div> 
              <p>Items : {order.items.length}</p>
              <p>${order.amount}</p>
              <div className="order-actions-container">
                <p className="driver-label">Tài xế giao hàng</p>
                <select onChange={(event)=>assignDriverHandler(event,order._id)} value={order.driverId || ""}>
                  <option value="">Chưa phân công</option>
                  {drivers.map((driver, idx) => (
                    // Only show Available drivers OR the one already assigned to this order
                    (driver.status === 'Available' || driver._id === order.driverId) && (
                      <option key={idx} value={driver._id}>{driver.name}</option>
                    )
                  ))}
                </select>

                <p className="status-label">Trạng thái đơn hàng</p>
                <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out of delivery">Out of delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <div title="Xóa đơn hàng" className="order-item-delete" onClick={() => removeOrder(order._id)}>
                  🗑️
                </div>
              </div>
          </div>

        ))

        }
      </div>
      
    </div>
  )
}

export default Orders
