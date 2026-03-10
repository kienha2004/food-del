import React from 'react';
import './Add.css';
import { assets } from '../../assets/assets';

const Add = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form data here
  };

  return (
    <div className="add">
      <form onSubmit={handleSubmit} className="flex-col">
        <div className="add-img-upload flex-col">
          <p>Tải hình ảnh lên</p>
          <label htmlFor="image">
            <img src={assets.upload_area} alt="Upload area" />
          </label>
          <input type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Tên sản phẩm</p>
          <input type="text" name="name" placeholder="Type here" required />
        </div>
        <div className="add-product-description flex-col">
          <p>Mô tả sản phẩm</p>
          <textarea name="description" rows="6" placeholder="Viết nội dung ở đây" required />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Danh mục sản phẩm</p>
            <select name="category">
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
            <input type="number" name="price" placeholder="$20" required />
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