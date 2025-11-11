import { Router } from "express";
import { authGuard } from "../middleware/auth.middleware";
import { validateMiddleware } from "../middleware/validate.middleware";
import { EmployeeSchema } from "../schemas/employee.schema";
import {
  createEmployeeController,
  deleteEmployeeController,
  getAllEmployeeController,
  getEmployeeByIdController,
  updateEmployeeController,
} from "../controllers/employee.controller";

export const employeeRoute = Router();

employeeRoute.use(authGuard);

employeeRoute.post(
  "/",
  validateMiddleware(EmployeeSchema),
  createEmployeeController
);
employeeRoute.put(
  "/:empId",
  validateMiddleware(EmployeeSchema),
  updateEmployeeController
);
employeeRoute.get("/:empId", getEmployeeByIdController);
employeeRoute.delete("/:empId", deleteEmployeeController);
employeeRoute.get("/", getAllEmployeeController);
