import bcrypt from "bcrypt";
import Usuario from "../models/Usuario";

class AuthService {
  static async login(email: string, senha: string) {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) return null;

    const senhaHash = usuario.get("senha") as string;

    const senhaValida = await bcrypt.compare(senha, senhaHash);

    if (!senhaValida) return null;

    return usuario;
  }
}

export default AuthService;