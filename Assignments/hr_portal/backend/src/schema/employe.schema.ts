import { z } from "zod";

export const employeeSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(50),
  username: z.string().min(3, "Username must be at least 3 characters").max(20),
  email: z.email("Invalid email address").max(100),
  phone: z.string().optional(),
  website: z
    .string()
    .regex(
      /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})([\/\w .-]*)*\/?$/,
      "Invalid website URL"
    )
    .optional(),
  role: z.enum(["Admin", "Editor", "Viewer"]),
  isActive: z.boolean(),
  skills: z.array(z.string().min(2).max(10)).min(1, "At least one skill required"),
  availableSlots: z.iso.datetime().optional(), 
  address: z.object({
    street: z.string().min(5).max(100),
    city: z.string().min(2).max(50),
    zipcode: z.string().regex(/^\d{5,10}$/, "Invalid zipcode format"),
  }),
  company: z.object({
    name: z.string().min(2).max(100),
  }),
});

