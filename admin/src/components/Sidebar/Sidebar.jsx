import React from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div className ='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/add' className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p> Thêm mục </p>
            </NavLink>
             <NavLink to='/list' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p> Danh sách các mục</p>
            </NavLink>
             <NavLink to='/orders' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Đơn đặt hàng</p>
            </NavLink>
             <NavLink to='/add-promotion' className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Thêm Mã Giảm Giá</p>
            </NavLink>
              <NavLink to='/list-promotion' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>DS Mã Giảm Giá</p>
            </NavLink>
            <NavLink to='/add-driver' className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Thêm Tài xế</p>
            </NavLink>
            <NavLink to='/list-drivers' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>DS Tài xế</p>
            </NavLink>
        </div>
      
    </div>
  )
}

export default Sidebar
