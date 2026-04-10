import { FindOptions } from "sequelize";
import Produto from "../models/Produto";
import { HttpError } from "../types/http_error";

export async function findByIdOuErroProduto(id: number, options?: FindOptions) {
  const produto = options
    ? await Produto.findByPk(id, options)
    : await Produto.findByPk(id);

  if (!produto) {
    throw new HttpError(404, "Produto não encontrado");
  }

  return produto;
}