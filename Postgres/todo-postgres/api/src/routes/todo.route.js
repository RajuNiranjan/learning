import express from "express";
import {
  createTodoController,
  deleteTodoController,
  getAllTodosController,
  getTodoByIdController,
  toggleTodoController,
  updateTodoController,
} from "../controllers/todo.controller.js";

export const todoRouter = express.Router();

todoRouter.post("/", createTodoController);
todoRouter.get("/", getAllTodosController);
todoRouter.get("/:id", getTodoByIdController);
todoRouter.put("/:id", updateTodoController);
todoRouter.delete("/:id", deleteTodoController);
todoRouter.patch("/toggle/:id", toggleTodoController);
