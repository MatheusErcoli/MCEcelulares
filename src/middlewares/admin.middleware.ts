import { Request, Response, NextFunction } from "express";

interface AdminRequest extends Request {
  isAdmin?: boolean;
}

function adminMiddleware(
  req: AdminRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.isAdmin) {
    return res.status(403).json({
      message: "Acesso permitido apenas para administradores",
    });
  }

  return next();
}

export default adminMiddleware;
