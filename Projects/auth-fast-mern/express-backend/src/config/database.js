import mongoose from "mongoose";
import { DB_URI } from "../utils/env.js";

const connectDB = async () => {
  try {
    if (!DB_URI) return;
    await mongoose.connect(DB_URI);
    console.log("server connected to Data Base");
  } catch (error) {
    console.log(error);
  }
};

connectDB();
