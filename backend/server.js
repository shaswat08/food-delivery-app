import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";
import foodRouter from "./routes/food.route.js";
import userRouter from "./routes/user.route.js";

const app = express();

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDB();

//

app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/images", express.static("uploads"));

//initialize server

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is listening to port ${PORT}...`));
