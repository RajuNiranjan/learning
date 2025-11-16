import { Router } from "express";
import {
  deleteTodos,
  getTodos,
  taskCreateController,
  updateTodos,
} from "../controller/todo.controller.js";

export const todoRoute = Router();

todoRoute.post("/", taskCreateController);
todoRoute.get("/", getTodos);
todoRoute.put("/:id", updateTodos);
todoRoute.delete("/:id", deleteTodos);
