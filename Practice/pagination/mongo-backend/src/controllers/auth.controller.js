import { UserModel } from "../models/user.model.js";
import {
  genAccessToken,
  genRefereshToken,
  hashPassword,
  verifyPassword,
  verifyRefreshToken,
} from "../utils/helper.js";

export const registerController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(404).json({ message: "all fields are required" });
  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already existed" });

    const hashedPassword = hashPassword(password);

    const user = new UserModel({ email, password: hashedPassword });

    await user.save();

    return res.status(201).json({ message: "User registed successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logInController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(404).json({ message: "all fields are required" });
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const validatePassword = verifyPassword(password, user.password);
    if (!validatePassword)
      return res.status(400).json({ message: "Invalid credentials" });

    const payload = { userId: user._id };

    const access_token = genAccessToken(payload);
    const refresh_token = genRefereshToken(payload);

    return res
      .cookie("refresh_token", refresh_token, {
        httpOnly: true,
        sameSite: "strict",
      })
      .status(200)
      .json({
        message: "user login successfully",
        access_token,
        user: {
          userId: user._id,
          email: user.email,
        },
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const refreshController = async (req, res) => {
  const refresh_token = req.cookies.refresh_token;

  if (!refresh_token) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = verifyRefreshToken(refresh_token);
    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const access_token = genAccessToken({ userId: user._id });

    return res.status(200).json({
      access_token,
      user: {
        userId: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

export const logOutcontroller = (req, res) => {
  res.clearCookie("refresh_token");
  return res.status(200).json({ message: "logged out successfully" });
};
