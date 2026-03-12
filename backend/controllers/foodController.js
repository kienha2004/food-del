import { promises as fs } from "fs"; // Ensures the fs module is imported correctly
import foodModel from "../models/foodModel.js";

// Function to add food
const addFood = async (req, res) => {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    // Check if a file has been uploaded
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded." });
    }

    const { name, description, price, category } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const image_filename = req.file.filename;

    // Create a new food item
    const food = new foodModel({
        name,
        description,
        price,
        category,
        image: image_filename,
    });

    try {
        // Save the food item to the database
        await food.save();
        return res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.error("Error saving food:", error);
        return res.status(500).json({ success: false, message: "Error saving food" });
    }
};

// Function to list all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        return res.json({ success: true, data: foods });
    } catch (error) {
        console.error("Error retrieving foods:", error);
        return res.status(500).json({ success: false, message: "Error retrieving foods" });
    }
};

// Function to remove food
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found." });
        }

        await fs.unlink(`uploads/${food.image}`);
        await foodModel.findByIdAndDelete(req.body.id);

        res.json({ success: true, message: "Food removed" });
    } catch (error) {
        console.error("Error removing food:", error);
        res.status(500).json({ success: false, message: "Error removing food" });
    }
};

export { addFood, listFood, removeFood };