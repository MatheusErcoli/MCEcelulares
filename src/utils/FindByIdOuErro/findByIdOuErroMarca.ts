import { FindOptions } from "sequelize";
import Marca from "../../models/Marca";
import { HttpError } from "../../types/http_error";

export async function findByIdOuErroMarca(id: number, options?: FindOptions) {
  const marca = options
    ? await Marca.findByPk(id, options)
    : await Marca.findByPk(id);

  if (!marca) {
    throw new HttpError(404, "marca não encontrado");
  }

  return marca;
}