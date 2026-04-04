import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './ListDrivers.css';

const ListDrivers = () => {
    // UI Mockup. The backend list api is not implemented yet.
    const [list] = useState([
        { name: "Nguyễn Văn A", phone: "0909123456", vehicleType: "Motorbike", licensePlate: "59A1-12345", status: "Available", isOnline: true },
        { name: "Trần Thị B", phone: "0888999777", vehicleType: "Car", licensePlate: "51G-98765", status: "Busy", isOnline: true }
    ]);

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
                        <p style={{color: item.status === 'Available' ? 'green' : 'orange'}}>{item.status}</p>
                        <p className="cursor" onClick={() => toast.info('Chức năng xoá đang hoàn thiện')}>X</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListDrivers;
