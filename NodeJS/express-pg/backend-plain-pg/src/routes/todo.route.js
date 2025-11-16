import { Router } from "express";
import {
  getAllTasks,
  taskCreateController,
  taskDeleteController,
  taskUpdateController,
} from "../controllers/todo.controller.js";

export const todoRouter = Router();

todoRouter.post("/", taskCreateController);
todoRouter.get("/", getAllTasks);
todoRouter.put("/:id", taskUpdateController);
todoRouter.delete("/:id", taskDeleteController);
