import { UserModel } from "../models/user.model.js";
import { hashPassword, verifyPassword } from "../utils/hashing.js";
import { genAccessToken, genRefreshToken } from "../utils/token.js";
import { sendEmail } from "../config/sendEmail.js";
import { verifyEmailTemplate } from "../templates/verifyEmail.template.js";
import { forgotPasswordTemplate } from "../templates/forgetPassword.template.js";
import { FRONT_END_ORIGIN } from "../utils/envVar.js";
import { uploadImage } from "../utils/cloudinary.js";
import { generateOTP } from "../utils/otp.js";

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    next({
      statusCode: 400,
      message: "All fields are required",
    });
  }

  try {
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { name }],
    });

    if (existingUser) {
      next({
        statusCode: 409,
        message: "User already existed",
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const verifyEmailURL = `${FRONT_END_ORIGIN}/verify-email?code=${newUser?._id}`;

    await sendEmail({
      sendTo: email,
      subject: "Verify email from blinkit",
      html: verifyEmailTemplate({
        name,
        url: verifyEmailURL,
      }),
    });

    const userRes = newUser.toObject();
    delete userRes.password;

    return res.status(201).json(userRes);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { code } = req.body;

    const user = await UserModel.findById(code);

    if (!user) {
      next({
        statusCode: 400,
        message: "Invalid Code",
      });
    }

    const updateUser = await UserModel.findByIdAndUpdate(
      code,
      {
        verify_email: true,
      },
      { new: true }
    ).select("-password");

    res.status(200).json(updateUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { emailOrUserName, password } = req.body;

  if (!emailOrUserName || !password) {
    return next({
      statusCode: 400,
      message: "All fields are required",
    });
  }

  try {
    const user = await UserModel.findOne({
      $or: [{ email: emailOrUserName }, { name: emailOrUserName }],
    });
    if (!user) {
      return next({
        statusCode: 404,
        message: "user not found",
      });
    }
    if (user.status === "Inactive" || user.status === "Suspended") {
      return next({
        statusCode: 400,
        message: "Contact to Admin",
      });
    }

    const validatePassword = await verifyPassword(password, user.password);
    if (!validatePassword) {
      return next({
        statusCode: 400,
        message: "Invalid credentials",
      });
    }

    await UserModel.findByIdAndUpdate(
      user._id,
      { last_login_data: Date.now() },
      { new: true }
    );

    await genAccessToken(user._id, res);
    await genRefreshToken(user._id, res);
    const userRes = user.toObject();
    delete userRes.password;
    return res.status(200).json(userRes);
    console.log(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { userId } = req.user;
    console.log("userId", userId);

    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    await UserModel.findByIdAndUpdate(
      userId,
      { refresh_token: "" },
      { new: true }
    );

    return res.status(200).json({ message: "user loggedout successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const uploadAvatar = async (req, res, next) => {
  try {
    const image = req.file;
    const upload = await uploadImage(image);

    await UserModel.findByIdAndUpdate(
      req.user.userId,
      { avatar: upload.secure_url },
      { new: true }
    );

    return res.status(201).json({ message: "avatar updated" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateUserDetails = async (req, res, next) => {
  const { userId } = req.user;
  const { name, email, mobile, password } = req.body;

  let hashedPassword;

  if (password) {
    hashedPassword = await hashPassword(password);
  }

  try {
    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        ...(name && { name }),
        ...(email && { email }),
        ...(mobile && { mobile }),
        ...(password && { password: hashedPassword }),
      },
      { new: true }
    );

    const userRes = updateUser.toObject();

    delete userRes.password;

    return res.status(201).json(userRes);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const forgetPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next({
      statusCode: 404,
      message: "email is required",
    });
  }

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return next({
        statusCode: 404,
        message: "user not found",
      });
    }

    const otp = generateOTP();
    const expiresIn = Date.now() + 60 * 60 * 1000;

    const update = await UserModel.findByIdAndUpdate(
      user._id,
      {
        forget_password_otp: otp,
        forget_password_expiry: expiresIn,
      },
      { new: true }
    );

    await sendEmail({
      sendTo: email,
      subject: "Forgot Password from Blinkit",
      html: forgotPasswordTemplate({
        name: user.name,
        otp,
      }),
    });

    return res
      .status(200)
      .json({ message: "an verification code send to your registed email" });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export const verifyForgotPasswordOTP = async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return next({
      statusCode: 400,
      message: "all fields are required",
    });
  }

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return next({
        statusCode: 400,
        message: "invalid user",
      });
    }

    const currentTime = Date.now();

    if (user.forget_password_expiry < currentTime) {
      return next({
        statusCode: 400,
        message: "otp is expired",
      });
    }

    if (otp !== user.forget_password_otp) {
      return next({
        statusCode: 400,
        message: "Invalid otp",
      });
    }

    await UserModel.findByIdAndUpdate(
      user._id,
      {
        forget_password_expiry: "",
        forget_password_otp: "",
      },
      { new: true }
    );

    return res.status(200).json({ message: "otp verified successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return console.log("all fields are required");
  }

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return console.log("user not found");
    }

    const hashedPassword = await hashPassword(newPassword);

    await UserModel.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      forget_password_expiry: "",
      forget_password_otp: "",
    });

    return res.status(200).json({ message: "password updated successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
