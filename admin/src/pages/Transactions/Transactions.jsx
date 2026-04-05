import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Transactions.css';

const Transactions = ({ url }) => {
    // Demo state as we might not have a full get-all API yet
    const [transactions, setTransactions] = useState([
        { _id: "txn_001", orderId: "ORD-1234", amount: 15.5, paymentMethod: "Stripe", paymentStatus: "Completed", date: new Date().toISOString() },
        { _id: "txn_002", orderId: "ORD-1235", amount: 20.0, paymentMethod: "Momo", paymentStatus: "Pending", date: new Date().toISOString() },
        { _id: "txn_003", orderId: "ORD-1236", amount: 8.5, paymentMethod: "COD", paymentStatus: "Completed", date: new Date().toISOString() }
    ]);

    // Example fetch function for future use
    const fetchTransactions = async () => {
        try {
            const response = await axios.get(`${url}/api/payment/list`);
            if (response.data.success) {
                setTransactions(response.data.data);
            }
        } catch (error) {
            // Uncomment when API is ready
            // toast.error("Không thể tải dữ liệu thanh toán");
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <div className="transactions flex-col">
            <p>Đối soát Giao dịch Thanh toán</p>
            <div className="transactions-table">
                <div className="transactions-table-format title">
                    <b>Mã Giao dịch</b>
                    <b>Mã Đơn hàng</b>
                    <b>Số tiền</b>
                    <b>Phương thức</b>
                    <b>Trạng thái</b>
                    <b>Thời gian</b>
                </div>
                {transactions.map((txn, index) => (
                    <div key={index} className="transactions-table-format">
                        <p>{txn._id}</p>
                        <p>{txn.orderId}</p>
                        <p>${txn.amount.toFixed(2)}</p>
                        <p>{txn.paymentMethod}</p>
                        <p>
                            <span className={`status-badge ${txn.paymentStatus.toLowerCase()}`}>
                                {txn.paymentStatus}
                            </span>
                        </p>
                        <p>{new Date(txn.date).toLocaleString('vi-VN')}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Transactions;
