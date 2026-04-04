import express from "express";
import { createPayment, getPaymentStatus } from "../controllers/paymentController.js";
import authMiddleware from "../middleware/auth.js";

const paymentRouter = express.Router();

paymentRouter.post("/create", authMiddleware, createPayment);
paymentRouter.post("/status", authMiddleware, getPaymentStatus);

export default paymentRouter;
