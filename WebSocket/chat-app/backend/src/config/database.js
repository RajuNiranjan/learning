import mongoose from "mongoose";
import { DB_URI, DB_COLLECTION_NAME } from "../utils/env_var.js";

const connectDB = async () => {
  try {
    if (DB_URI) {
      await mongoose.connect(DB_URI + "/" + DB_COLLECTION_NAME).then(() => {
        console.log("Connected to database");
      });
    } else {
      throw new Error("DB_URI is not defined");
    }
  } catch (error) {
    console.log("Database connection error:", error.message);
    throw new Error("Failed to connect to database");
  }
};

connectDB();
