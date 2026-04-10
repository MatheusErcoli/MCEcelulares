import { NextFunction, Request, Response } from "express";
import Marca from "../models/Marca";
import Produto from "../models/Produto";
import { HttpError } from "../types/http_error";
import { findByIdOuErroMarca } from "../utils/findByIdOuErroMarca";
import { adicionarFiltroQueryNumero } from "../utils/pegarNumeroQuery";

class MarcaController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const where: Record<string, number> = {};

      adicionarFiltroQueryNumero(where, "id_categoria", req.query.id_categoria as string);

      const temFiltroCategoria = !!where.id_categoria;

      const marcas = await Marca.findAll({
        include: temFiltroCategoria ? [
          {
            model: Produto, as: 'produtos',
            where,
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

      const marca = await Marca.create({ nome });

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