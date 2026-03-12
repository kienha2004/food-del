import express from "express";
import { addFood,listFood,removeFood } from "../controllers/foodController.js";
import multer from "multer";
import path from "path";

const foodRouter = express.Router();

// Resolve the correct path for the uploads directory
const uploadsDir = path.join(process.cwd(), 'uploads'); // Assuming 'uploads' is in your current working directory

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // Use the resolved uploads directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueSuffix); 
    }
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list",listFood);
foodRouter.post("/remove",removeFood);

export default foodRouter;