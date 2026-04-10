import { FindOptions } from "sequelize";
import Usuario from "../models/Usuario";
import { HttpError } from "../types/http_error";

export async function findByIdOuErroUsuario(id: number, options?: FindOptions) {
  const usuario = options
    ? await Usuario.findByPk(id, options)
    : await Usuario.findByPk(id);

  if (!usuario) {
    throw new HttpError(404, "Usuário não encontrado");
  }

  return usuario;
}