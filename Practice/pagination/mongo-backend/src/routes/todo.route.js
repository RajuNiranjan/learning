import { Router } from "express";
import { AuthGuard } from "../middlewares/auth.middleware.js";
import {
  deleteTaskController,
  getAllTodos,
  taskCreateController,
  updateTaskController,
} from "../controllers/todo.controller.js";

export const TodoRoute = Router();

TodoRoute.use(AuthGuard);

TodoRoute.post("/", taskCreateController);
TodoRoute.get("/", getAllTodos);
TodoRoute.put("/:taskId", updateTaskController);
TodoRoute.delete("/:taskId", deleteTaskController);
