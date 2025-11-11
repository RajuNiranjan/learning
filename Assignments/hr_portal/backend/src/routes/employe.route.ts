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
import { roleMiddleware } from "../middleware/role.middleware";

export const employeeRoute = Router();

employeeRoute.use(authGuard);

employeeRoute.post(
  "/",
  roleMiddleware(["Admin", "Editor"]),
  validateMiddleware(EmployeeSchema),
  createEmployeeController
);
employeeRoute.put(
  "/:empId",
  roleMiddleware(["Admin", "Editor"]),
  validateMiddleware(EmployeeSchema),
  updateEmployeeController
);
employeeRoute.delete(
  "/:empId",
  roleMiddleware(["Admin"]),
  deleteEmployeeController
);
employeeRoute.get("/:empId", getEmployeeByIdController);
employeeRoute.get("/", getAllEmployeeController);
