import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Transactions.css';

const Transactions = ({ url }) => {

    const [transactions, setTransactions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState({ id: '', amount: 0, payment: false });

    const fetchTransactions = async () => {
        try {
            const response = await axios.get(`${url}/api/order/list`);
            if (response.data.success) {
                setTransactions(response.data.data.reverse());
            }
        } catch (error) {
            toast.error("Không thể kết nối dữ liệu Kế toán");
        }
    };

    const deleteTransaction = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa giao dịch/đơn hàng này không?")) {
            try {
                const response = await axios.post(`${url}/api/order/remove`, { orderId: id });
                if (response.data.success) {
                    toast.success(response.data.message);
                    fetchTransactions();
                }
            } catch (error) {
                toast.error("Lỗi khi xóa giao dịch");
            }
        }
    };

    const handleEditClick = (item) => {
        setEditData({ id: item._id, amount: item.amount, payment: item.payment });
        setShowModal(true);
    };

    const updateTransaction = async () => {
        try {
            const response = await axios.post(`${url}/api/order/update-payment`, { 
                orderId: editData.id, 
                payment: editData.payment,
                amount: editData.amount 
            });
            if (response.data.success) {
                toast.success(response.data.message);
                setShowModal(false);
                fetchTransactions();
            }
        } catch (error) {
            toast.error("Lỗi khi cập nhật giao dịch");
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <div className="transactions flex-col">
            <p>Đối soát Giao dịch Thanh toán (Theo Đơn hàng)</p>
            <div className="transactions-table">
                <div className="transactions-table-format title">
                    <b>Mã (ID)</b>
                    <b>Tiền thu</b>
                    <b>Phướng thức</b>
                    <b>Trạng thái Thu</b>
                    <b>Ngày</b>
                    <b>Thao tác</b>
                </div>
                {transactions.length === 0 ? <p style={{padding: '20px'}}>Chưa có dữ liệu giao dịch...</p> : 
                transactions.map((item, index) => (
                    <div key={index} className="transactions-table-format">
                        <p>{item._id.slice(-6).toUpperCase()}</p>
                        <p>${item.amount}</p>
                        <p>{item.payment ? '💳 Stripe' : '💵 Tiền mặt'}</p>
                        <p>
                            <span className={`status-badge ${item.payment ? 'completed' : 'pending'}`}>
                                {item.payment ? 'Đã Nhận' : 'Chờ COD'}
                            </span>
                        </p>
                        <p>{new Date(item.date).toLocaleDateString('vi-VN')}</p>
                        <div className="action-btns">
                            <span className="edit-btn" onClick={() => handleEditClick(item)}>✎</span>
                            <span className="delete-btn" onClick={() => deleteTransaction(item._id)}>🗑️</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Chỉnh sửa */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Chỉnh sửa Giao dịch</h3>
                        <p style={{fontSize: '12px', color: '#666', marginBottom: '15px'}}>ID: {editData.id}</p>
                        <div>
                            <label>Số tiền ($)</label>
                            <input 
                                type="number" 
                                value={editData.amount} 
                                onChange={(e) => setEditData({...editData, amount: e.target.value})}
                            />
                        </div>
                        <div>
                            <label>Trạng thái thanh toán</label>
                            <select 
                                value={editData.payment} 
                                onChange={(e) => setEditData({...editData, payment: e.target.value === 'true'})}
                            >
                                <option value="true">Đã thu tiền</option>
                                <option value="false">Chưa thu (Chờ COD)</option>
                            </select>
                        </div>
                        <div className="modal-actions">
                            <button className="cancel-btn" onClick={() => setShowModal(false)}>Hủy</button>
                            <button className="save-btn" onClick={updateTransaction}>Lưu thay đổi</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Transactions;
