import { promises as fs } from "fs";
import foodModel from "../models/foodModel.js";


const addFood = async (req, res) => {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);


    if (!req.file) {
        return res.status(400).json({ success: false, message: "Không có file được tải lên." });
    }

    const { name, description, price, category } = req.body;


    if (!name || !description || !price || !category) {
        return res.status(400).json({ success: false, message: "Tất cả các trường là bắt buộc." });
    }

    const image_filename = req.file.filename;


    const food = new foodModel({
        name,
        description,
        price,
        category,
        image: image_filename,
    });

    try {

        await food.save();
        return res.json({ success: true, message: "Thêm món ăn thành công" });
    } catch (error) {
        console.error("Error saving food:", error);
        return res.status(500).json({ success: false, message: "Lỗi khi thêm món ăn" });
    }
};


const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        return res.json({ success: true, data: foods });
    } catch (error) {
        console.error("Error retrieving foods:", error);
        return res.status(500).json({ success: false, message: "Lỗi khi lấy danh sách món ăn" });
    }
};


const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (!food) {
            return res.status(404).json({ success: false, message: "Không tìm thấy món ăn." });
        }

        await fs.unlink(`uploads/${food.image}`);
        await foodModel.findByIdAndDelete(req.body.id);

        res.json({ success: true, message: "Xóa món ăn thành công" });
    } catch (error) {
        console.error("Error removing food:", error);
        res.status(500).json({ success: false, message: "Lỗi khi xóa món ăn" });
    }
};

export { addFood, listFood, removeFood };