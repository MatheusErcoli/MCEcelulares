import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AuthService from "../services/auth.service";
import { HttpError } from "../types/http_error";

class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, senha } = req.body;

      const usuario = await AuthService.login(email, senha);

      if (!usuario) throw new HttpError(401, "Email ou senha inválidos");

      const token = jwt.sign(
        { id_usuario: usuario.get("id_usuario"), admin: usuario.get("admin") },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        id_usuario: usuario.id_usuario,
        nome: usuario.nome,
        admin: usuario.admin,
        token
      });

    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;