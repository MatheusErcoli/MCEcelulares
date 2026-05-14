import { Request, Response, NextFunction } from "express";
import { HttpError } from "../types/http_error";

interface AdminRequest extends Request {
  isAdmin?: boolean;
}

function adminMiddleware(
  req: AdminRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.isAdmin) {
    return next(new HttpError(403, "Acesso permitido apenas para administradores"));
  }

  return next();
}

export default adminMiddleware;