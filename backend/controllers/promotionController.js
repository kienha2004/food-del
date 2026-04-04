import promotionModel from "../models/promotionModel.js";

export const addPromotion = async (req, res) => {
    try {
        const { code, description, discountType, discountValue, startDate, endDate } = req.body;
        const newPromo = new promotionModel({
            code, description, discountType, discountValue, startDate, endDate
        });
        await newPromo.save();
        res.json({ success: true, message: "Đã thêm mã khuyến mãi thành công" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi khi thêm mã khuyến mãi" });
    }
};

export const validatePromotion = async (req, res) => {
    try {
        const { code } = req.body;
        const promo = await promotionModel.findOne({ code, isActive: true });
        if (promo && new Date() >= promo.startDate && new Date() <= promo.endDate) {
            res.json({ success: true, data: promo });
        } else {
            res.json({ success: false, message: "Mã khuyến mãi không hợp lệ hoặc đã hết hạn" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi khi xác thực mã khuyến mãi" });
    }
};
