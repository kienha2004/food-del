import express from "express";
import { registerDriver, updateStatus, getDrivers, removeDriver } from "../controllers/driverController.js";

const driverRouter = express.Router();

driverRouter.post("/register", registerDriver);
driverRouter.post("/update-status", updateStatus);
driverRouter.get("/list", getDrivers);
driverRouter.post("/remove", removeDriver);

export default driverRouter;
