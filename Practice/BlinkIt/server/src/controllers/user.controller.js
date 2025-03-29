import { sendEmail } from "../config/sendEmail.js";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { verifyEmailTemplate } from "../utils/verifyEmailTemplate.js";
import { ENV_VARIABLES } from "../utils/env.js";
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "user alredy existed" });
    }
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = new UserModel(payload);
    await newUser.save();

    const url = `${ENV_VARIABLES.FRONTEND_URL}/verify-email/${newUser._id}`;

    const verifyEmail = await sendEmail({
      to: email,
      subject: " Welcome to BlinkIt – Verify Your Email!",
      html: verifyEmailTemplate(name, url),
    });

    const userRes = newUser.toObject();
    delete userRes.password;

    return res.status(201).json({
      message: "User created successfully",
      user: userRes,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
