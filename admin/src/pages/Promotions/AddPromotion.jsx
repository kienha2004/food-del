import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AddPromotion.css';

const AddPromotion = ({ url }) => {
    const [data, setData] = useState({
        code: "",
        description: "",
        discountType: "percentage",
        discountValue: "",
        minOrderValue: "",
        startDate: "",
        endDate: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${url}/api/promotion/add`, data);
            if (response.data.success) {
                setData({
                    code: "", description: "", discountType: "percentage",
                    discountValue: "", minOrderValue: "", startDate: "", endDate: ""
                });
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Lỗi khi thêm mã giảm giá");
        }
    };

    return (
        <div className="add-promotion">
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-product-name flex-col">
                    <p>Mã giảm giá (Code)</p>
                    <input onChange={onChangeHandler} value={data.code} type="text" name="code" placeholder="VD: TET2024" required />
                </div>
                <div className="add-product-description flex-col">
                    <p>Mô tả chi tiết</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="3" placeholder="Giảm giá nhân dịp lễ..." required />
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Loại giảm giá</p>
                        <select onChange={onChangeHandler} name="discountType" value={data.discountType}>
                            <option value="percentage">Phần trăm (%)</option>
                            <option value="fixed_amount">Số tiền cố định (VND)</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Mức giảm</p>
                        <input onChange={onChangeHandler} value={data.discountValue} type="number" name="discountValue" placeholder="VD: 20 hoặc 50000" required />
                    </div>
                </div>
                <div className="add-category-price">
                    <div className="add-price flex-col">
                        <p>Đơn tối thiểu</p>
                        <input onChange={onChangeHandler} value={data.minOrderValue} type="number" name="minOrderValue" placeholder="Điều kiện bắt buộc" required />
                    </div>
                </div>
                <div className="add-category-price">
                    <div className="add-price flex-col">
                        <p>Ngày bắt đầu</p>
                        <input onChange={onChangeHandler} value={data.startDate} type="date" name="startDate" required />
                    </div>
                    <div className="add-price flex-col">
                        <p>Ngày kết thúc</p>
                        <input onChange={onChangeHandler} value={data.endDate} type="date" name="endDate" required />
                    </div>
                </div>
                <button type="submit" className="add-btn">Thêm Mã</button>
            </form>
        </div>
    );
}

export default AddPromotion;
