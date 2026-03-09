import fs from 'fs';
import foodModel from '../models/foodModel.js'; // Ensure this import is correct

// Function to add food
export const addFood = async (req, res) => {
    console.log('Headers:', req.headers);
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file); // This is where you expect the file information

    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const foodItem = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: req.file.filename,
    };

    // Save foodItem to the database (add your database logic here)

    res.status(200).json({ success: true, message: "Food item added successfully", foodItem });
};

// Function to list foods
export const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});  // Ensure foodModel is properly defined
        res.json({ success: true, data: foods });
    } catch (error) {
        console.error(error);  // Use the correct variable
        res.status(500).json({ success: false, message: "Error retrieving food items" });
    }
};

// Function to remove food
export const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        // Use backticks for string interpolation
        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
                return res.status(500).json({ success: false, message: "Error deleting image file" });
            }
        });

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food removed successfully" });

    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ success: false, message: "An error occurred while removing the food" });
    }
};