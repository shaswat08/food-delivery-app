import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateTokenSetCookie = (res, id) => {
  try {
    const token = jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "5d" });
    res.cookie("jcookie", token, {
      maxAge: 5 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
    });
  } catch (error) {
    console.log(
      "Error in the generateTokenSetCookie function: ",
      error.message
    );
  }
};
