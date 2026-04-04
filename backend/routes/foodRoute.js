import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";
import path from "path";

const foodRouter = express.Router();

// Giải quyết đường dẫn chính xác cho thư mục uploads
const uploadsDir = path.join(process.cwd(), 'uploads'); // Giả sử 'uploads' nằm trong thư mục làm việc hiện tại

// Cấu hình lưu trữ Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // Sử dụng thư mục uploads đã giải quyết
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueSuffix);
    }
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;