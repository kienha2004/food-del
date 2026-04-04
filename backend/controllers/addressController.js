import addressModel from "../models/addressModel.js";


export const addAddress = async (req, res) => {
    try {
        const { userId, firstName, lastName, email, street, city, state, zipcode, country, phone } = req.body;
        const newAddress = new addressModel({
            userId, firstName, lastName, email, street, city, state, zipcode, country, phone
        });
        await newAddress.save();
        res.json({ success: true, message: "Địa chỉ đã được thêm thành công", data: newAddress });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi khi thêm địa chỉ" });
    }
};


export const getUserAddresses = async (req, res) => {
    try {
        const addresses = await addressModel.find({ userId: req.body.userId });
        res.json({ success: true, data: addresses });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi khi lấy danh sách địa chỉ" });
    }
};


export const removeAddress = async (req, res) => {
    try {
        await addressModel.findByIdAndDelete(req.body.addressId);
        res.json({ success: true, message: "Địa chỉ đã được xóa" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi khi xóa địa chỉ" });
    }
};
