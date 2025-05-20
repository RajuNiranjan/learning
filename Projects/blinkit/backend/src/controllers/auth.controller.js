import { UserModel } from "../models/user.model.js";
import { hashPassword } from "../utils/hashing.js";
import { gen_token } from "../utils/token.js";
import { sendEmail } from "../config/sendEmail.js";
import { verifyEmailTemplate } from "../templates/verifyEmail.template.js";
import { FRONT_END_ORIGIN } from "../utils/envVar.js";

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
