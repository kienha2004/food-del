import express from "express";
import { addPromotion, validatePromotion, getPromotions, removePromotion } from "../controllers/promotionController.js";

const promotionRouter = express.Router();

promotionRouter.post("/add", addPromotion);
promotionRouter.post("/validate", validatePromotion);
promotionRouter.get("/list", getPromotions);
promotionRouter.post("/remove", removePromotion);

export default promotionRouter;
