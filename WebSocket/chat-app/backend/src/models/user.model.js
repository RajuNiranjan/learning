import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    profile_picture: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("user", userSchema);
