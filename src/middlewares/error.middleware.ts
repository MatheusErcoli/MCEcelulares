import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { HttpError } from "../types/http_error";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

if (error instanceof ZodError) {
  return res.status(400).json({
    message: error.issues.map((issue) => issue.message).join("\n"),
  });
}

  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Erro de validação",
      errors: error.issues,
    });
  }

  return res.status(500).json({
    message: "Erro interno do servidor",
  });
};