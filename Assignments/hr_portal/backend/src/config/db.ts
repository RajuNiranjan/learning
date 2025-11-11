import { connect } from "mongoose";
import { envConfig } from "../utils/env_config";

const connectDB = async () => {
  if (!envConfig.DB_URI) throw new Error("Invalid DB URI");

  await connect(envConfig.DB_URI)
    .then(() => console.log("connected to Data Base"))
    .catch((e) => console.log(e));
};
connectDB();
