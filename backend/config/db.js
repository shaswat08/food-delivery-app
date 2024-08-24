import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to the Mongo database");
  } catch (error) {
    console.log("Error connecting to the databse: ", error.message);
  }
};
