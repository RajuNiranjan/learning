import { Request, Response } from "express";
import { EmployeeModel } from "../models/employee.model";

export const createEmployeeController = async (req: Request, res: Response) => {
  try {
    const employee = await EmployeeModel.create(req.body);
    return res.status(201).json(employee);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to create employee", error });
  }
};

// export const getAllEmployeeController = async (req: Request, res: Response) => {
//   const page = parseInt(req.query.page as string) || 1;
//   const limit = parseInt(req.query.limit as string) || 5;
//   const skip = (page - 1) * limit;

//   const search = (req.query.search as string) || "";
//   const role = (req.query.role as string) || undefined;
//   const status = (req.query.status as string) || undefined;

//   const query: any = {};
//   try {
//     if (search) {
//       query.$or = [
//         { name: { $regex: search, $options: "i" } },
//         { email: { $regex: search, $options: "i" } },
//       ];
//     }

//     if (role) query.role = role;
//     if (status) query.isActive = status === "active";

//     const [employees, total] = await Promise.all([
//       EmployeeModel.find(query).skip(skip).limit(limit),
//       EmployeeModel.countDocuments(query),
//     ]);

//     const totalPages = Math.ceil(total / limit);

//     return res.json({
//       employees,
//       total,
//       page,
//       totalPages,
//     });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Failed to fetch employees", error });
//   }
// };

export const getEmployeeByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { empId } = req.params;
    const employee = await EmployeeModel.findById(empId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    return res.status(200).json(employee);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch employee", error });
  }
};

export const updateEmployeeController = async (req: Request, res: Response) => {
  try {
    const { empId } = req.params;
    const employee = await EmployeeModel.findByIdAndUpdate(empId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json(employee);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to update employee", error });
  }
};

export const deleteEmployeeController = async (req: Request, res: Response) => {
  try {
    const { empId } = req.params;
    const employee = await EmployeeModel.findByIdAndDelete(empId);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to delete employee", error });
  }
};

export const getAllEmployeeController = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;
  const skip = (page - 1) * limit;

  const search = req.query.search || "";
  const role = req.query.role || undefined;
  const status = req.query.status || undefined;

  const query: any = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $option: "1" } },
      { email: { $regex: search, $option: "1" } },
    ];
  }

  if (role) query.role = role;
  if (status) query.status = status;

  const [employee, total] = await Promise.all([
    EmployeeModel.find(query).skip(skip).limit(limit),
    EmployeeModel.countDocuments(query),
  ]);

  const totalPages = Math.ceil(total / limit);

  return res.status(200).json({
    employee,
    total,
    page,
    totalPages,
  });
};
