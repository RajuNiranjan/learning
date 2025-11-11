import { z } from "zod";

export const registerSchema = z.object({
  email: z.email("Inlvaid Email Address"),
  password: z
    .string(
      "Password must contain 6-15 letter with specil, upper, lower, numbers includes"
    )
    .min(6)
    .max(15)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/
    ),
  role: z.enum(["Admin", "Editor", "Viewer"]).default("Admin"),
  username: z.string().min(3).max(20),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});
