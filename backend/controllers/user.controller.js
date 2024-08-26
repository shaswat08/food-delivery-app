import bcrypt from "bcrypt";
import validator from "validator";
import User from "../models/user.model.js";
import { generateTokenSetCookie } from "../utils/generateTokenSetCookie.js";

//user registration

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const dupUser = await User.findOne({ username });

    if (dupUser) {
      return res.status(400).json({
        success: false,
        message: "Username already exists in the system",
      });
    }

    const dupEmail = await User.findOne({ email });

    if (dupEmail) {
      return res.status(400).json({
        success: false,
        message: "Username already exists in the system",
      });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a valid email" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a strong password" });
    }

    //using bcrypt for password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    generateTokenSetCookie(res, user._id);

    res.status(200).json({
      success: true,
      message: `User: ${user.username} registration successfull`,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error on the registerUser controller: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// user login

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Provided password is not valid" });
    }

    generateTokenSetCookie(res, user._id);

    res.status(200).json({
      success: true,
      message: `User: ${username} logged in successfully`,
    });
  } catch (error) {
    console.log("Error on the loginUser controller: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
