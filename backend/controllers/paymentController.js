import paymentModel from "../models/paymentModel.js";

export const createPayment = async (req, res) => {
    try {
        const { orderId, userId, amount, paymentMethod } = req.body;
        const newPayment = new paymentModel({
            orderId, userId, amount, paymentMethod
        });
        await newPayment.save();
        res.json({ success: true, message: "Đã ghi nhận thanh toán", data: newPayment });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi khi ghi nhận thanh toán" });
    }
};

export const getPaymentStatus = async (req, res) => {
    try {
        const { orderId } = req.body;
        const payment = await paymentModel.findOne({ orderId });
        if (payment) {
            res.json({ success: true, data: payment });
        } else {
            res.json({ success: false, message: "Không tìm thấy thanh toán" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi khi lấy thông tin thanh toán" });
    }
};
