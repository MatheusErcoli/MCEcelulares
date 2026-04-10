import bcrypt from "bcrypt";

export async function hashSenha(senha: string) {
    return bcrypt.hash(senha, 10);
}