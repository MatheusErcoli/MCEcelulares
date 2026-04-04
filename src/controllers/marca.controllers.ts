import { NextFunction, Request, Response } from "express";
import Marca from "../models/Marca";
import Produto from "../models/Produto";
import { HttpError } from "../types/http_error";

class MarcaController {
static async findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const { id_categoria } = req.query;

    const marcas = await Marca.findAll({
      include: id_categoria ? [
        { 
          model: Produto, 
          where: { id_categoria: Number(id_categoria) }, 
          attributes: [], 
          required: true }
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

      if (!marca) {
        throw new HttpError(404, "Marca não encontrada");
      }

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

    if (!marca) {
        throw new HttpError(404, "Marca não encontrada");
    }

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

    if (!marca) {
        throw new HttpError(404, "Marca não encontrada");
    }

    await marca.destroy();

    return res.status(204).send();
    } catch (error) {
      next(error)
    }
  }
}

export default MarcaController;