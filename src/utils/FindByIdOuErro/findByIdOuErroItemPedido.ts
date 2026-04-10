import { FindOptions } from "sequelize";
import ItemPedido from "../../models/ItemPedido";
import { HttpError } from "../../types/http_error";

export async function findByIdOuErroItemPedido(id: number, options?: FindOptions) {
  const itemPedido = options
    ? await ItemPedido.findByPk(id, options)
    : await ItemPedido.findByPk(id);

  if (!itemPedido) {
    throw new HttpError(404, "item do pedido não encontrado");
  }

  return itemPedido;
}