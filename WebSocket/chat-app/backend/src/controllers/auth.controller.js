import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { gen_token } from "../utils/jwt_token.js";
import { NODE_ENV } from "../utils/env_var.js";
import cloudinary from "../utils/cloudinary.js";

export const signUp = async (req, res, next) => {
  const { user_name, email, password } = req.body;

  try {
    if (!user_name || !email || !password) {
      return next({
        statusCode: 400,
        message: "All fields are required",
      });
    }

    const user = await UserModel.findOne({ $or: [{ email }, { user_name }] });
    if (user) {
      return next({
        statusCode: 400,
        message: "User already exists",
      });
    }

    if (password.length < 6) {
      return next({
        statusCode: 400,
        message: "Password must be at least 6 characters long",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      user_name,
      email,
      password: hashPassword,
    });

    if (newUser) {
      gen_token(newUser._id, res);
      await newUser.save();
    }

    const userResponse = newUser.toObject();
    delete userResponse.password;

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userResponse,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { emailOrUsername, password } = req.body;

  try {
    if (!emailOrUsername || !password) {
      return next({
        statusCode: 400,
        message: "All fields are required",
      });
    }

    const user = await UserModel.findOne({
      $or: [{ email: emailOrUsername }, { user_name: emailOrUsername }],
    });

    if (!user) {
      return next({
        statusCode: 400,
        message: "Invalid email or username",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next({
        statusCode: 400,
        message: "Invalid password",
      });
    }

    gen_token(user._id, res);

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: userResponse,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: NODE_ENV !== "development",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const { profile_picture } = req.body;

    if (!profile_picture) {
      return next({
        statusCode: 400,
        message: "Profile picture is required",
      });
    }

    const uploadResponse = (await cloudinary.uploader.upload(profile_picture))
      .secure_url;

    await UserModel.findByIdAndUpdate(
      user_id,
      {
        profile_picture: uploadResponse,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const checkAuth = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const user = await UserModel.findById(user_id).select("-password");

    if (!user) {
      return next({
        statusCode: 400,
        message: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
