import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "VND" },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, default: "Pending" },
    transactionId: { type: String },
    date: { type: Date, default: Date.now }
});

const paymentModel = mongoose.models.payment || mongoose.model("payment", paymentSchema);
export default paymentModel;
