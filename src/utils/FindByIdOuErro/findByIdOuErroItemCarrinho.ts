import { FindOptions } from "sequelize";
import ItemCarrinho from "../../models/ItemCarrinho";
import { HttpError } from "../../types/http_error";

export async function findByIdOuErroItemCarrinho(id: number, options?: FindOptions) {
  const itemCarrinho = options
    ? await ItemCarrinho.findByPk(id, options)
    : await ItemCarrinho.findByPk(id);

  if (!itemCarrinho) {
    throw new HttpError(404, "item do carrinho não encontrado");
  }

  return itemCarrinho;
}