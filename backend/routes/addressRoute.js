import express from "express";
import { addAddress, getUserAddresses, removeAddress } from "../controllers/addressController.js";
import authMiddleware from "../middleware/auth.js";

const addressRouter = express.Router();

addressRouter.post("/add", authMiddleware, addAddress);
addressRouter.post("/get", authMiddleware, getUserAddresses);
addressRouter.post("/remove", authMiddleware, removeAddress);

export default addressRouter;
