import { NextFunction, Request, Response } from "express";
import Categoria from "../models/Categoria";
import { HttpError } from "../types/http_error";

class CategoriaController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const categorias = await Categoria.findAll();

      return res.status(200).json(categorias);
    } catch (error) {
      next(error)
    }
  }

  static async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const categoria = await Categoria.findByPk(Number(id));

      if (!categoria) throw new HttpError(404, "Categoria não encontrada.");

      return res.status(200).json(categoria);
    } catch (error) {
      next(error)
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
    const { nome, descricao } = req.body;

    const categoria = await Categoria.create({
      nome,
      descricao,
      ativo:true,
    });

    return res.status(201).json(categoria);
    } catch (error) {
      next(error)
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
    const { id } = req.params;

    const categoria = await Categoria.findByPk(Number(id));

    if (!categoria) throw new HttpError(404, "Não foi possível atualizar: Categoria não encontrada.");

    const dados = req.body;

    await categoria.update(dados);

    return res.status(200).json(categoria);
    } catch (error) {
      next(error)
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
    const { id } = req.params;

    const categoria = await Categoria.findByPk(Number(id));

    if (!categoria) throw new HttpError(404, "Não foi possível excluir: Categoria não encontrada.");

    await categoria.destroy();

    return res.status(204).send();
    } catch (error) {
      next(error)
    }
  }
}

export default CategoriaController;
