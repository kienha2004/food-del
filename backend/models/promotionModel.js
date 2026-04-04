import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    discountType: { type: String, required: true }, // "percentage" or "fixed_amount"
    discountValue: { type: Number, required: true }, 
    minOrderValue: { type: Number, default: 0 },
    maxDiscountAmount: { type: Number },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    usageLimit: { type: Number, default: 100 },
    usedCount: { type: Number, default: 0 }
});

const promotionModel = mongoose.models.promotion || mongoose.model("promotion", promotionSchema);
export default promotionModel;
