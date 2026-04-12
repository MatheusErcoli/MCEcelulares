import { NextFunction, Request, Response } from "express";
import Marca from "../models/Marca";
import Produto from "../models/Produto";
import { HttpError } from "../types/http_error";
import { findByIdOuErroMarca } from "../utils/FindByIdOuErro/findByIdOuErroMarca";
import { adicionarFiltroNumero } from "../utils/adicionarFiltroNumero";
import { adicionarFiltroBoolean } from "../utils/adicionarFiltroBoolean";

class MarcaController {
static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
        const whereMarca: Record<string, number | boolean> = {};
        const whereProduto: Record<string, number | boolean> = {};

        adicionarFiltroBoolean(whereMarca, "ativo", req.query.ativo as string);
        adicionarFiltroNumero(whereProduto, "id_categoria", req.query.id_categoria as string);

        const temFiltroCategoria = !!whereProduto.id_categoria;

        const marcas = await Marca.findAll({
            where: whereMarca,
            include: temFiltroCategoria ? [
                {
                    model: Produto, as: 'produtos',
                    where: whereProduto,
                    attributes: [],
                    required: true
                }
            ] : [],
        });

        return res.status(200).json(marcas);
    } catch (error) {
        next(error);
    }
}

  static async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const marca = await findByIdOuErroMarca(Number(id));

      return res.status(200).json(marca);
    } catch (error) {
      next(error)
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { nome } = req.body;

      const marca = await Marca.create({ nome, ativo: true });

      return res.status(201).json(marca);
    } catch (error) {
      next(error)
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const marca = await findByIdOuErroMarca(Number(id));

      await marca.update(req.body);

      return res.status(200).json(marca);
    } catch (error) {
      next(error)
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const marca = await findByIdOuErroMarca(Number(id));

      await marca.destroy();

      return res.status(204).send();
    } catch (error) {
      next(error)
    }
  }
}

export default MarcaController;