import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import './AddressBook.css';

const AddressBook = () => {
    const { url, token } = useContext(StoreContext);
    const [addresses, setAddresses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "", lastName: "", email: "", street: "",
        city: "", state: "", zipcode: "", country: "", phone: ""
    });

    const fetchAddresses = async () => {
        if (!token) return;
        try {
            const response = await axios.post(`${url}/api/address/get`, {}, { headers: { token } });
            if (response.data.success) {
                setAddresses(response.data.data);
            }
        } catch (error) {
            console.error("Lỗi lấy danh sách địa chỉ:", error);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, [token]);

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddAddress = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/api/address/add`, formData, { headers: { token } });
            if (response.data.success) {
                alert("Đã lưu địa chỉ mới");
                setShowForm(false);
                setFormData({
                    firstName: "", lastName: "", email: "", street: "",
                    city: "", state: "", zipcode: "", country: "", phone: ""
                });
                fetchAddresses();
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert("Lỗi khi thêm địa chỉ");
        }
    };

    const removeAddress = async (addressId) => {
        try {
            const res = await axios.post(`${url}/api/address/remove`, { addressId }, { headers: { token } });
            if (res.data.success) {
                fetchAddresses();
            }
        } catch (error) {
            alert("Lỗi xóa địa chỉ");
        }
    };

    return (
        <div className="address-book">
            <h2>Sổ Địa Chỉ Của Tôi</h2>
            <button className="add-new-btn" onClick={() => setShowForm(!showForm)}>
                {showForm ? "Đóng" : "+ Thêm Địa Chỉ Mới"}
            </button>

            {showForm && (
                <form onSubmit={handleAddAddress} className="address-form">
                    <div className="multi-fields">
                        <input required name="firstName" onChange={onChangeHandler} value={formData.firstName} placeholder="Họ" />
                        <input required name="lastName" onChange={onChangeHandler} value={formData.lastName} placeholder="Tên" />
                    </div>
                    <input required name="email" type="email" onChange={onChangeHandler} value={formData.email} placeholder="Email" />
                    <input required name="phone" onChange={onChangeHandler} value={formData.phone} placeholder="Số điện thoại" />
                    <input required name="street" onChange={onChangeHandler} value={formData.street} placeholder="Số nhà, Tên đường" />
                    <div className="multi-fields">
                        <input required name="city" onChange={onChangeHandler} value={formData.city} placeholder="Thành phố" />
                        <input required name="state" onChange={onChangeHandler} value={formData.state} placeholder="Tỉnh / Tiểu bang" />
                    </div>
                    <div className="multi-fields">
                        <input required name="zipcode" onChange={onChangeHandler} value={formData.zipcode} placeholder="Mã bưu điện" />
                        <input required name="country" onChange={onChangeHandler} value={formData.country} placeholder="Quốc gia" />
                    </div>
                    <button type="submit">Lưu Địa Chỉ</button>
                </form>
            )}

            <div className="address-list">
                {addresses.length === 0 ? <p>Bạn chưa có địa chỉ nào được lưu.</p> : null}
                {addresses.map((addr) => (
                    <div key={addr._id} className="address-card">
                        <h4>{addr.firstName} {addr.lastName} - {addr.phone}</h4>
                        <p>{addr.street}, {addr.city}, {addr.state}, {addr.country}</p>
                        <button onClick={() => removeAddress(addr._id)} className="delete-btn">Xóa</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddressBook;
