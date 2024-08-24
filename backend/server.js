import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

connectToDB();

//

//initialize server

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is listening to port ${PORT}...`));
