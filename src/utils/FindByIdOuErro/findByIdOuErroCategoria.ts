import { FindOptions } from "sequelize";
import { HttpError } from "../../types/http_error";
import Categoria from "../../models/Categoria";

export async function findByIdOuErroCategoria(id: number, options?: FindOptions) {
  const categoria = options
    ? await Categoria.findByPk(id, options)
    : await Categoria.findByPk(id);

  if (!categoria) {
    throw new HttpError(404, "categoria não encontrada");
  }

  return categoria;
}