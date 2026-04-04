import express from "express";
import { registerDriver, updateStatus } from "../controllers/driverController.js";

const driverRouter = express.Router();

driverRouter.post("/register", registerDriver);
driverRouter.post("/update-status", updateStatus);

export default driverRouter;
