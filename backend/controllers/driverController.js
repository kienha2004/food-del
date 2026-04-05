import driverModel from "../models/driverModel.js";


export const registerDriver = async (req, res) => {
    try {
        const { name, phone, email, password, vehicleType, licensePlate } = req.body;
        const newDriver = new driverModel({
            name, phone, email, password, vehicleType, licensePlate
        });
        await newDriver.save();
        res.json({ success: true, message: "Đăng ký tài xế thành công" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi khi đăng ký tài xế" });
    }
};


export const updateStatus = async (req, res) => {
    try {
        const { driverId, isOnline, status } = req.body;
        await driverModel.findByIdAndUpdate(driverId, { isOnline, status });
        res.json({ success: true, message: "Cập nhật trạng thái thành công" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi khi cập nhật trạng thái" });
    }
};

export const getDrivers = async (req, res) => {
    try {
        const drivers = await driverModel.find({});
        res.json({ success: true, data: drivers });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi khi tải danh sách tài xế" });
    }
};

export const removeDriver = async (req, res) => {
    try {
        await driverModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Đã xóa tài xế thành công" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi khi xóa tài xế" });
    }
};
