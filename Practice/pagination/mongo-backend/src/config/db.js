import { connect } from "mongoose";
import { DB_URI } from "../utils/env_config.js";

export const connectDB = async () => {
  if (!DB_URI) throw new Error("Please provide DB URI");
  try {
    await connect(DB_URI)
      .then(() => console.log("connected to database"))
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
