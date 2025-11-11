import { Request, Response, NextFunction } from "express";
import { ZodError, ZodObject } from "zod";

export const validateMiddleware = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const zodError = result.error as ZodError;
      const error = zodError.issues.map((i) => ({
        field: i.path.join("."),
        message: i.message,
      }));

      return res.status(400).json({ message: `Validation failed ${error}` });
    }

    next();
  };
};
