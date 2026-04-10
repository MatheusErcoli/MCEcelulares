import { FindOptions } from "sequelize";
import { HttpError } from "../../types/http_error";
import Carrinho from "../../models/Carrinho";


export async function findByIdOuErroCarrinho(id: number, options?: FindOptions) {
  const carrinho = options
    ? await Carrinho.findByPk(id, options)
    : await Carrinho.findByPk(id);

  if (!carrinho) {
    throw new HttpError(404, "carrinho não encontrado");
  }

  return carrinho;
}