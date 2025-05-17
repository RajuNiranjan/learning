import { gen_token } from "../utils/token.js";
import { userModel } from "../models/user.model.js";
import { hashPassword, validatePassword } from "../utils/hashing.js";

export const signupController = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next({
      statusCode: 400,
      message: "All fields are required",
    });
  }

  try {
    const existedUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existedUser) {
      next({
        statusCode: 400,
        message: "User already existed",
      });
    }

    const profile_pic = `https://avatar.iran.liara.run/username?username=${username}`;
    const hashedPassword = await hashPassword(password);

    const newUser = new userModel({
      username,
      email,
      profile_pic,
      password: hashedPassword,
    });

    await newUser.save();

    gen_token(newUser._id, res);

    const userResponse = newUser.toObject();
    delete userResponse.password;

    return res.status(201).json(userResponse);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const login_controller = async (req, res, next) => {
  const { emailOrUserName, password } = req.body;

  if (!emailOrUserName || !password) {
    next({
      statusCode: 400,
      message: "All fields are required",
    });
  }

  try {
    const user = await userModel.findOne({
      $or: [{ email: emailOrUserName }, { username: emailOrUserName }],
    });

    if (!user) {
      next({
        statusCode: 404,
        message: "user not found",
      });
    }

    if (!validatePassword(user.password, password)) {
      next({
        statusCode: 400,
        message: "Invalid credentials",
      });
    }

    gen_token(user._id, res);

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(200).json(userResponse);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const logout_controller = async (req, res, next) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
    });
    return res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
