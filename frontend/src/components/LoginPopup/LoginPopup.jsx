import './LoginPopup.css'
import { assets } from '../../assets/assets'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios"
const LoginPopup = ({ setShowLogin }) => {
  const {url,setToken}= useContext(StoreContext)
  const [currState, setCurrState] = useState("Login");
  
  const[data,setData] = useState({
    name:"",
    email:"",
    password:""
  })
  const onChangeHandler =(event)=>{
    const name= event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }
  const onLogin = async( event)=>{
 event.preventDefault()
 let newUrl =url;
 if(currState==="Login"){
  newUrl += "/api/user/login"
 } else {
  newUrl += "/api/user/register"
}
const response = await axios.post(newUrl,data);
if(response.data.success){
setToken(response.data.token);
localStorage.setItem("token",response.data.token);
setShowLogin(false)
} else{
  alert(response.data.message)
}
  }
  useEffect(()=>{
    console.log(data);
  },[data])
  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close"/>
        </div>
        <div className="login-popup-inputs">
            {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler}  value ={data.name} type="text" placeholder='tên của bạn' required />}
            
            <input name='email' onChange={onChangeHandler } value={data.email} type="email" placeholder='email của bạn' required />
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password của bạn' required />   
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Log In"}</button>
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