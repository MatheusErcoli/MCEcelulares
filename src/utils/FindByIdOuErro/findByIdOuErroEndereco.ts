import { FindOptions } from "sequelize";
import Endereco from "../../models/Endereco";
import { HttpError } from "../../types/http_error";

export async function findByIdOuErroEndereco(id: number, options?: FindOptions) {
  const endereco = options
    ? await Endereco.findByPk(id, options)
    : await Endereco.findByPk(id);

  if (!endereco) {
    throw new HttpError(404, "endereço não encontrado");
  }

  return endereco;
}