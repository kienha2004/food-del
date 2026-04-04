import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config.js'
import cartRouter from "./routes/cartRoute.js";

import orderRouter from "./routes/orderRoute.js";
import addressRouter from "./routes/addressRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import driverRouter from "./routes/driverRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
import promotionRouter from "./routes/promotionRoute.js";

dotenv.config(); //Tải các biến môi trường

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

//Kết nối với cơ sở dữ liệu
connectDB();

app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)
app.use("/api/address", addressRouter);
app.use("/api/review", reviewRouter);
app.use("/api/driver", driverRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/promotion", promotionRouter);
app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});