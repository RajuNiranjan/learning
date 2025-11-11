import { z } from "zod";

export const EmployeeSchema = z.object({
  name: z.string().min(3).max(50),
  username: z.string().min(3).max(20),
  email: z.email().max(100),
  phone: z.string().optional(),
  website: z.url().optional(),
  role: z.enum(["Admin", "Editor", "Viewer"]).default("Admin"),
  isActive: z.boolean().default(true),
  skills: z.array(z.string()),
  availableSlots: z.array(z.string()),
  address: z.object({
    street: z.string().min(5).max(20),
    city: z.string().min(5).max(20),
    zipcode: z.string().min(5).max(10),
  }),
  company: z.object({
    name: z.string(),
  }),
});
