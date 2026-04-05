import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import './ListDrivers.css';

const ListDrivers = ({ url }) => {

    const [list, setList] = useState([]);

    const fetchDrivers = async () => {
        try {
            const res = await axios.get(`${url}/api/driver/list`);
            if (res.data.success) {
                setList(res.data.data);
            }
        } catch (error) {
            toast.error("Không thể tải danh sách tài xế");
        }
    };

    const removeDriver = async (driverId) => {
        try {
            const response = await axios.post(`${url}/api/driver/remove`, { id: driverId });
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchDrivers();
            } else {
                toast.error("Lỗi khi xóa tài xế");
            }
        } catch (error) {
            toast.error("Không thể kết nối API xóa");
        }
    };

    useEffect(() => {
        fetchDrivers();
    }, []);

    return (
        <div className="list add flex-col">
            <p>Danh sách Tài xế</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Tên</b>
                    <b>SĐT</b>
                    <b>Phương tiện</b>
                    <b>Biển số xe</b>
                    <b>Trạng thái</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => (
                    <div key={index} className="list-table-format">
                        <p>{item.name}</p>
                        <p>{item.phone}</p>
                        <p>{item.vehicleType}</p>
                        <p>{item.licensePlate}</p>
                        <p style={{ color: item.status === 'Available' ? 'green' : 'orange' }}>{item.status || 'Available'}</p>
                        <p className="cursor" onClick={() => removeDriver(item._id)}>X</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListDrivers;
