import { NextFunction, Request, Response } from "express";
import Marca from "../models/Marca";
import Produto from "../models/Produto";
import { HttpError } from "../types/http_error";

class MarcaController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const where: Record<string, number> = {};

      const id_categoria = req.query.id_categoria && req.query.id_categoria !== "undefined"
        ? Number(req.query.id_categoria)
        : undefined;

      if (id_categoria) where.id_categoria = id_categoria;

      const marcas = await Marca.findAll({
        include: id_categoria ? [
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

      const marca = await Marca.findByPk(Number(id));

      if (!marca) throw new HttpError(404, "Marca não encontrada");

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

      const marca = await Marca.findByPk(Number(id));

      if (!marca) throw new HttpError(404, "Marca não encontrada");

      await marca.update(req.body);

      return res.status(200).json(marca);
    } catch (error) {
      next(error)
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const marca = await Marca.findByPk(Number(id));

      if (!marca) throw new HttpError(404, "Marca não encontrada");

      await marca.destroy();

      return res.status(204).send();
    } catch (error) {
      next(error)
    }
  }
}

export default MarcaController;