import { FindOptions } from "sequelize";
import UsuarioPedido from "../../models/Usuario_pedido";
import { HttpError } from "../../types/http_error";

export async function findByIdOuErroUsuarioPedido(id: number, options?: FindOptions) {
  const usuarioPedido = options
    ? await UsuarioPedido.findByPk(id, options)
    : await UsuarioPedido.findByPk(id);

  if (!usuarioPedido) {
    throw new HttpError(404, "usuario do pedido nao encontrado");
  }

  return usuarioPedido;
}
