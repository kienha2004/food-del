
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import LoginPopup from '../LoginPopup/LoginPopup';
import { StoreContext } from '../../context/StoreContext';
import React, { useState, useContext } from 'react';
const Navbar = ({ setShowLogin }) => { 
  const [menu, setMenu] = useState("home");
  const{getTotalCartAmount,token,setToken}= useContext(StoreContext);

  return (
    <div className='navbar'>
        <Link to='/'><img src={assets.logo} alt="Logo" className="logo" /></Link>
        <ul className="navbar-menu">
            <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
            <a href ='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
            <a href ='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile App</a>
            <a href ='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="Search" />
            <div className="navbar-search_icon">
                <Link to='/cart'> <img src={assets.basket_icon} alt="Basket" /></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>
            {!token?<button onClick={()=> setShowLogin(true)}>Sign In</button>
            :<div className='navbar-profile'>
                <img src ={assets.profile_icon} alt=""/>
                <ul className="nav-profile-dropdown"> 
                 <li> <img src ={assets.bag_icon} alt=""/><p>Orders</p></li>
                 <hr />
                 <li> <img src ={assets.logout_icon} alt=""/><p>LogOut</p></li>
                </ul>
                            
                </div>}
            
        </div>
    </div>
  );
}

export default Navbar;