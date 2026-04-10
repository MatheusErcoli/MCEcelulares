import Usuario from "../models/Usuario";
import { HttpError } from "../types/http_error";

export async function findByIdOuErro(id: number, options?: any) {
  const usuario = options
    ? await Usuario.findByPk(id, options)
    : await Usuario.findByPk(id);

  if (!usuario) {
    throw new HttpError(404, "Usuário não encontrado");
  }

  return usuario;
}