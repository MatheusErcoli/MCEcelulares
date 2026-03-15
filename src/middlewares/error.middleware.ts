import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  console.error(error);

  if (error.name === "ZodError") {
    return res.status(400).json({
      message: "Erro de validação",
      errors: error.errors,
    });
  }

  return res.status(500).json({
    message: "Erro interno do servidor",
  });
};