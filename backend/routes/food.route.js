import express from "express";
import { addFood, listFood, removeFood } from "../controllers/food.controller.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/add", upload.single("image"), addFood);
router.get("/list", listFood);
router.post("/remove/:id", removeFood);

export default router;
