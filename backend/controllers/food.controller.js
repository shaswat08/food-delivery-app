import Food from "../models/food.model.js";
import fs from "fs";

//add food

export const addFood = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    const image_filename = req.file.filename;

    const food = new Food({
      name,
      description,
      price,
      image: image_filename,
      category,
    });

    await food.save();
    res.status(200).json({ success: true, message: "Food item added" });
  } catch (error) {
    console.log("Error in the addFood controller: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//all food list

export const listFood = async (req, res) => {
  try {
    const food = await Food.find({});
    res.status(200).json({ success: true, data: food });
  } catch (error) {
    console.log("Error in the listFood controller: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//remove food item

export const removeFood = async (req, res) => {
  try {
    const { id } = req.params;

    const food = await Food.findById(id);

    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }

    fs.unlink(`uploads/${food.image}`, () => {});
    await Food.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Food item removed" });
  } catch (error) {
    console.log("Error in the removeFood controller: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
