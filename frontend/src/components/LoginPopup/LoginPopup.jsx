import './LoginPopup.css'
import { assets } from '../../assets/assets'
import React, { useState } from 'react'

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");

  return (
    <div className='login-popup'>
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close"/>
        </div>
        <div className="login-popup-inputs">
            {currState==="Login"?<></>:<input type="text" placeholder='tên của bạn' required />}
            
            <input type="email" placeholder='email của bạn' required />
            <input type="password" placeholder='Password của bạn' required />   
        </div>
        <button>{currState === "Sign Up" ? "Create Account" : "Log In"}</button>
        <div className="login-popup-condition">
            <input type="checkbox"  required/>
            <p>Tôi đồng ý với điều khoản dịch vụ và Chính sách bảo mật</p>
        </div>
        {currState==="Login"
        ?<p>Tạo một tài khoản mới ? <span onClick={()=>setCurrState("Sign Up ")}>Bấm vào đây </span></p> 
        :<p>Bạn đã có tài khoản chưa? <span onClick={()=>setCurrState("Login")}>Đăng nhập tại đây</span> </p> }
        
        
      </form>
    </div>
  )
}

export default LoginPopup;