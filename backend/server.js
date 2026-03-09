import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());
app.use("/api/food", foodRouter); // Make sure this line is present

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server started on http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to the database", error);
    });

app.get("/", (req, res) => {
    res.send("API Working");
});