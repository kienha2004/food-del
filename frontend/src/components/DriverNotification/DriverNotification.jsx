import React, { useContext } from 'react';
import './DriverNotification.css';
import { StoreContext } from '../../context/StoreContext';

const DriverNotification = () => {
    const { isDriver, driverStatus } = useContext(StoreContext);

    if (!isDriver) return null;

    return (
        <div className={`driver-notification-banner ${driverStatus === 'Busy' ? 'busy' : 'available'}`}>
            <div className="banner-content">
                <span className="icon">🛵</span>
                <p>
                    Bạn đang đăng nhập với vai trò <strong>Tài xế (Shipper)</strong>. 
                    Trạng thái hiện tại: <span className="status-badge">{driverStatus}</span>
                </p>
            </div>
            {driverStatus === 'Busy' && (
                <p className="busy-note">Bạn đang có đơn hàng cần giao. Vui lòng hoàn thành trước khi nhận đơn mới!</p>
            )}
        </div>
    );
};

export default DriverNotification;
