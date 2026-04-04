import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AddDriver.css';

const AddDriver = ({ url }) => {
    const [data, setData] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        vehicleType: "Motorbike",
        licensePlate: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${url}/api/driver/register`, data);
            if (response.data.success) {
                setData({
                    name: "", phone: "", email: "", password: "",
                    vehicleType: "Motorbike", licensePlate: ""
                });
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Lỗi khi thêm Tài xế");
        }
    };

    return (
        <div className="add-driver">
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-product-name flex-col">
                    <p>Họ tên Tài xế</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="VD: Nguyễn Văn A" required />
                </div>
                
                <div className="add-category-price">
                    <div className="add-price flex-col">
                        <p>Số điện thoại</p>
                        <input onChange={onChangeHandler} value={data.phone} type="text" name="phone" placeholder="0909123456" required />
                    </div>
                    <div className="add-price flex-col">
                        <p>Email</p>
                        <input onChange={onChangeHandler} value={data.email} type="email" name="email" placeholder="Email đăng nhập" required />
                    </div>
                </div>

                <div className="add-category-price">
                    <div className="add-price flex-col">
                        <p>Mật khẩu</p>
                        <input onChange={onChangeHandler} value={data.password} type="password" name="password" required />
                    </div>
                </div>

                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Loại phương tiện</p>
                        <select onChange={onChangeHandler} name="vehicleType" value={data.vehicleType}>
                            <option value="Motorbike">Xe máy</option>
                            <option value="Bike">Xe đạp</option>
                            <option value="Car">Ô tô</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Biển số xe</p>
                        <input onChange={onChangeHandler} value={data.licensePlate} type="text" name="licensePlate" placeholder="VD: 59A1-12345" required />
                    </div>
                </div>

                <button type="submit" className="add-btn">Đăng ký Tài xế</button>
            </form>
        </div>
    );
}

export default AddDriver;
