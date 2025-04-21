import { Router } from "express";
import { getAllTasks, createTask, updateTask, deleteTask } from "../controllers/todo.controller.js";

export const todoRouter = Router()

todoRouter.get('/', getAllTasks)
todoRouter.post('/', createTask)
todoRouter.put('/:id', updateTask)
todoRouter.delete('/:id', deleteTask)
