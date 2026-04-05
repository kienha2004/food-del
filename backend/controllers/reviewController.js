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

// Cập nhật đánh giá
export const updateReview = async (req, res) => {
    try {
        const { reviewId, rating, comment } = req.body;
        await reviewModel.findByIdAndUpdate(reviewId, { rating, comment });
        res.json({ success: true, message: "Đã cập nhật đánh giá" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi khi cập nhật đánh giá" });
    }
};

// Xóa đánh giá
export const removeReview = async (req, res) => {
    try {
        const { reviewId } = req.body;
        await reviewModel.findByIdAndDelete(reviewId);
        res.json({ success: true, message: "Đã xóa đánh giá" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi khi xóa đánh giá" });
    }
};
