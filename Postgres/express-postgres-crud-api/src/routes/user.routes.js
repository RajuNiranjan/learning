import express from 'express'
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/user.controller.js'

export const userRouter = express.Router()

userRouter.post("/",  createUser)
userRouter.get("/", getUsers)
userRouter.get("/:id", getUserById)
userRouter.put("/:id",  updateUser)
userRouter.delete("/:id", deleteUser)