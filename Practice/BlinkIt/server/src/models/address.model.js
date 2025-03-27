import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema(
  {
    address_line: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    pincode: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    mobile_number: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const AddressModel = mongoose.model("address", addressSchema);
