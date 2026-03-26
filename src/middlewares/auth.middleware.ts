import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id_usuario: number;
  admin: boolean;
}

interface AuthenticatedRequest extends Request {
  userId?: number;
  isAdmin?: boolean;
}

export default function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token não informado",
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as TokenPayload;

    req.userId = decoded.id_usuario;
    req.isAdmin = decoded.admin;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Token inválido",
    });
  }
}
