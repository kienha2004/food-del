import React, {  useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from "axios"
import { toast } from 'react-toastify';

const Add = () => {
  const url ="http://localhost:4000";
   const [image,setImage]= useState(false);
   const [data,setData]= useState({
    name:"",
    description:"",
    price:"",
    category:"Salad"

   })

   const onChangeHandler =(event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
   }
 const onSubmitHandler = async (event)=>{
event.preventDefault();
const formData = new FormData();
formData.append("name", data.name)
formData.append("description", data.description)
formData.append("price", Number(data.price))
formData.append("category", data.category)
formData.append("image", image)
const response = await axios.post(`${url}/api/food/add`, formData);
if(response.data.suceess){
  setData({
    name:"",
    description:"",
    price:"",
    category:"Salad"

  })
  setImage(false)
 toast.suceess(response.data.message) 
}
else{
toast.error(response.data.message)
}



 }
  return (
    <div className="add">
      <form onSubmit={onSubmitHandler} className="flex-col">
        <div className="add-img-upload flex-col">
          <p>Tải hình ảnh lên</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="Upload area" />
          </label>
          <input onChange={(e)=>setImage (e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Tên sản phẩm</p>
          <input onChange={onChangeHandler} value= {data.name} type="text" name="name" placeholder="Type here" required />
        </div>
        <div className="add-product-description flex-col">
          <p>Mô tả sản phẩm</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="Viết nội dung ở đây" required />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Danh mục sản phẩm</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Salad">Salad</option>
              <option value="Bánh cuốn">Bánh cuốn</option>
              <option value="Món tráng miệng">Món tráng miệng</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Bánh ngọt">Bánh ngọt</option>
              <option value="Rau Nguyên Chất">Rau Nguyên Chất</option>
              <option value="Mì ống">Mì ống</option>
              <option value="Mì">Mì</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Giá sản phẩm</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder="$20" required />
          </div>
        </div>
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;