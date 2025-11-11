import { Schema, model } from "mongoose";

const EmployeeSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, require: true },
    username: { type: String, required: true },
    phone: { type: String },
    website: { type: String },
    role: {
      type: String,
      enum: ["Admin", "Editor", "Viewer"],
      default: "Admin",
    },
    isActive: { type: String, default: true },
    skills: [{ type: String }],
    availableSlots: [{ type: String }],
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      zipcode: { type: String, required: true },
    },
    company: {
      name: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export const EmployeeModel = model("Employee", EmployeeSchema);
