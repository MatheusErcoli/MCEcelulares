import { FindOptions } from "sequelize";
import Pedido from "../models/Pedido";
import { HttpError } from "../types/http_error";

export async function findByIdOuErroPedido(id: number, options?: FindOptions) {
  const pedido = options
    ? await Pedido.findByPk(id, options)
    : await Pedido.findByPk(id);

  if (!pedido) {
    throw new HttpError(404, "pedido não encontrado");
  }

  return pedido;
}