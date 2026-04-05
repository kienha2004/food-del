import express from "express";
import { createPayment, getPaymentStatus, getPayments } from "../controllers/paymentController.js";
import authMiddleware from "../middleware/auth.js";

const paymentRouter = express.Router();

paymentRouter.post("/create", authMiddleware, createPayment);
paymentRouter.post("/status", authMiddleware, getPaymentStatus);
paymentRouter.get("/list", getPayments);

export default paymentRouter;
