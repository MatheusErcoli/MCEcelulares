import { FindOptions } from "sequelize";
import EnderecoPedido from "../../models/Endereco_pedido";
import { HttpError } from "../../types/http_error";

export async function findByIdOuErroEnderecoPedido(id: number, options?: FindOptions) {
  const enderecoPedido = options
    ? await EnderecoPedido.findByPk(id, options)
    : await EnderecoPedido.findByPk(id);

    if (!enderecoPedido) {
    throw new HttpError(404, "endereço do pedido não encontrado");
    }

    return enderecoPedido;
}