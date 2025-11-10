import {z} from 'zod'


export const regiserSchema = z.object({
    username: z.string().min(3).max(50),
    email: z.email(),
    password: z.string().min(6).max(50),
    role: z.enum(["ADMIN", "EDITOR", "VIEWER"]).optional()
})


export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
})