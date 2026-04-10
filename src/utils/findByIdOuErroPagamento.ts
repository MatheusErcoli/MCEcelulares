import { FindOptions } from "sequelize";
import Pagamento from "../models/Pagamento";
import { HttpError } from "../types/http_error";

export async function findByIdOuErroPagamento(id: number, options?: FindOptions) {
  const pagamento = options
    ? await Pagamento.findByPk(id, options)
    : await Pagamento.findByPk(id);

  if (!pagamento) {
    throw new HttpError(404, "pagamento não encontrado");
  }

  return pagamento;
}