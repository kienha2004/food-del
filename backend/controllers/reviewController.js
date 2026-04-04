import reviewModel from "../models/reviewModel.js";

// Thêm đánh giá mới
export const addReview = async (req, res) => {
    try {
        const { userId, foodId, orderId, rating, comment } = req.body;
        const newReview = new reviewModel({
            userId, foodId, orderId, rating, comment
        });
        await newReview.save();
        res.json({ success: true, message: "Đã thêm đánh giá thành công" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi khi thêm đánh giá" });
    }
};

// Lấy đánh giá cho một món ăn
export const getFoodReviews = async (req, res) => {
    try {
        const { foodId } = req.body;
        const reviews = await reviewModel.find({ foodId });
        res.json({ success: true, data: reviews });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi khi lấy đánh giá" });
    }
};
