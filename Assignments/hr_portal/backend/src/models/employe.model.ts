import {Schema, model} from 'mongoose'


export interface EmployeType{
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

const employeSchema = new Schema<EmployeType>(
{
    name: { type: String, required: true, minlength:3, maxLength:50 },
    username: { type: String, required: true, minlength:3, maxLength:20},
    email: { type: String, required: true, maxlength:100 },
    phone: String,
    website: String,
    role: { type: String, enum: ["Admin", "Editor", "Viewer"], required: true },
    isActive: { type: Boolean, default: true },
    skills: [{ type: String }],
    availableSlots: [{ type: String }],
    address: {
      street: String,
      city: String,
      zipcode: String,
    },
    company: {
      name: String,
    },
}, {timestamps:true})

export const EmployeModel = model<EmployeType>("Employe", employeSchema)