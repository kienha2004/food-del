import express from "express"; 
import multer from 'multer'; 
import { addFood, listFood, removeFood } from "../controllers/foodController.js"; 
import path from 'path'; // Import path

const foodRouter = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
    destination: "uploads", // Ensure this directory exists
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

// Set up multer upload with fileFilter
const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/; // Allowed formats
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error("Error: File upload invalid."));
    }
});

// Route for adding food
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.delete("/remove", removeFood);

export default foodRouter;