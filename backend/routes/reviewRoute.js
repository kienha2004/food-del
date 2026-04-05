import express from "express";
import { addReview, getFoodReviews, updateReview, removeReview } from "../controllers/reviewController.js";
import authMiddleware from "../middleware/auth.js";

const reviewRouter = express.Router();

reviewRouter.post("/add", authMiddleware, addReview);
reviewRouter.post("/food-reviews", getFoodReviews);
reviewRouter.post("/update", authMiddleware, updateReview);
reviewRouter.post("/remove", authMiddleware, removeReview);

export default reviewRouter;
