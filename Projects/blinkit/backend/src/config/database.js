import mongoose from "mongoose";
import { DB_NAME, MONGODB_URI } from "../utils/envVar.js";

const connectDB = async () => {
  if (!MONGODB_URI) {
    console.log("no db uri provided");
  }
  try {
    const connect = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`);
    console.log(`server connected to Data Base --> ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

connectDB();
