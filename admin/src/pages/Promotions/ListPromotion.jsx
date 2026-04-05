import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './ListPromotion.css';

const ListPromotion = ({ url }) => {

    const [list, setList] = useState([]);

    const fetchList = async () => {

        try {
            const response = await axios.get(`${url}/api/promotion/list`);
            if (response.data.success) {
                setList(response.data.data);
            }
        } catch (error) {
            toast.error("API get danh sách chưa hoạt động");
        }
    };

    const removePromotion = async (promotionId) => {
        try {
            const response = await axios.post(`${url}/api/promotion/remove`, { id: promotionId });
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchList();
            } else {
                toast.error("Lỗi xóa mã");
            }
        } catch (error) {
            toast.error("Không thể kết nối để xóa");
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className="list add flex-col">
            <p>Danh sách mã giảm giá</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Mã (Code)</b>
                    <b>Loại</b>
                    <b>Mức giảm</b>
                    <b>Đơn tối thiểu</b>
                    <b>Hết hạn</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => (
                    <div key={index} className="list-table-format">
                        <p>{item.code}</p>
                        <p>{item.discountType === 'percentage' ? '%' : 'VND'}</p>
                        <p>{item.discountValue}</p>
                        <p>{item.minOrderValue}</p>
                        <p>{new Date(item.endDate).toLocaleDateString()}</p>
                        <p className="cursor" onClick={() => removePromotion(item._id)}>X</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListPromotion;
