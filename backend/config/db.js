import mongoose from "mongoose";

export const connectDB = async () => {
      console.log("MongoDB URI:", process.env.MONGODB_URI);
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB Connected");
    } catch (error) {
        console.error("DB Connection Error:", error);
    }
};