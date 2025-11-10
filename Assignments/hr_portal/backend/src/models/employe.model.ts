import { Schema, model, Document } from "mongoose";

export interface Employee extends Document {
  name: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
  role: "Admin" | "Editor" | "Viewer";
  isActive: boolean;
  skills: string[];
  availableSlots: string[];
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const employeeSchema = new Schema<Employee>(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      maxlength: 100,
      match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      maxlength: 20,
      match: /^[0-9+\-\s()]*$/,
    },
    website: {
      type: String,
      maxlength: 100,
      match: /^(https?:\/\/)?([\w\-])+\.([a-z]{2,6})([\/\w\-]*)*\/?$/,
    },
    role: {
      type: String,
      enum: ["Admin", "Editor", "Viewer"],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    skills: [
      {
        type: String,
        minlength: 2,
        maxlength: 10,
      },
    ],
    availableSlots: [
      {
        type: String,
        validate: {
          validator: (v: string) => !isNaN(Date.parse(v)) && new Date(v) > new Date(),
          message: "availableSlots must contain future ISO date strings",
        },
      },
    ],
    address: {
      street: {
        type: String,
        minlength: 5,
        maxlength: 100,
      },
      city: {
        type: String,
        minlength: 2,
        maxlength: 50,
      },
      zipcode: {
        type: String,
        match: /^[0-9]{5,10}$/,
      },
    },
    company: {
      name: {
        type: String,
        minlength: 2,
        maxlength: 100,
      },
    },
  },
  { timestamps: true }
);

export const EmployeeModel = model<Employee>("Employee", employeeSchema);
