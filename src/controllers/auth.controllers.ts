import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AuthService from "../services/auth.service";

class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, senha } = req.body;

      const usuario = await AuthService.login(email, senha);

      if (!usuario) {
        return AuthController.credenciaisInváilidas(res);
      }

      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET não definido");
      }

      const token = jwt.sign(
        {
          id_usuario: usuario.get("id_usuario"),
          admin: usuario.get("admin"),
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      const { senha: _, ...usuarioSemSenha } = usuario.toJSON();

      return res.status(200).json({
        usuario: usuarioSemSenha,
        token,
      });

    } catch (error) {
      next(error);
    }
  }

  private static credenciaisInváilidas(res: Response) {
    return res.status(401).json({
      message: "Email ou senha inválidos",
    });
  }
}

export default AuthController;