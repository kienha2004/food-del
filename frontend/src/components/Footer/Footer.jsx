import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
         <div className="footer-content-left">
     <img src={assets.logo} alt="" />
     <p>FoodExpress cam kết mang lại trải nghiệm giao đồ ăn tốt nhất, đảm bảo thức ăn luôn tươi ngon và chất lượng. Đồng thời, công ty cũng chú trọng bảo vệ sức khỏe khách hàng thông qua các biện pháp vệ sinh an toàn thực phẩm.</p>
     <div className="footer-social-icons">
        <img src={assets.facebook_icon} alt="" />
        <img src={assets.twitter_icon} alt="" />
        <img src={assets.linkedin_icon} alt="" />
     </div>
         </div>
           <div className="footer-content-center">
            <h2>Công ty của chúng tôi </h2>
            <ul>
                <li>Về chúng tôi</li>
                <li>Liên hệ</li>
                <li>Vận chuyển</li>
                <li>Chính sách bảo mật</li>
            </ul>
         </div>
         <div className="footer-content-right">
           <h2> Liên lạc</h2>
           <ul>
             <li>123 Đường ABC, Quận XYZ, TP. HCM</li>
             <li>Email: info@company.com</li>
             <li>Điện thoại: (123) 456-7890</li>
           </ul>
         </div>
       
    </div>
    <hr />
    <p className="footer-copyright">
        &copy; 2024 Food Delivery. All rights reserved.
    </p>
    </div>
    
  )
}

export default Footer
