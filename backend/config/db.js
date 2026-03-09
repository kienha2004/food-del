import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://tomkien2022_db_user:Namkien2803@cluster0.faovoz8.mongodb.net/food-del');
        console.log("DB connected");
    } catch (error) {
        console.error("Failed to connect to the database:", error.message);
    }
};