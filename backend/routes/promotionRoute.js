import express from "express";
import { addPromotion, validatePromotion } from "../controllers/promotionController.js";

const promotionRouter = express.Router();

promotionRouter.post("/add", addPromotion);
promotionRouter.post("/validate", validatePromotion);

export default promotionRouter;
