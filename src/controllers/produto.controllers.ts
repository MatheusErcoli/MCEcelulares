import { NextFunction, Request, Response } from "express";
import Produto from "../models/Produto";
import { PaginatedResponse } from "../types/paginated";
import { HttpError } from "../types/http_error";

class ProdutoController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Math.max(1, parseInt(req.query.page as string) || 1);
      const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);

      const { count, rows } = await Produto.findAndCountAll({
        where: {
          id_categoria: req.query.id_categoria ? Number(req.query.id_categoria) : undefined,
          id_marca: req.query.id_marca ? Number(req.query.id_marca) : undefined,
          destaque: req.query.destaque === "true" ? true : undefined,
        },
        include: ["marca", "categoria"],
        limit,
        offset: (page - 1) * limit,
        order: [["id_produto", "ASC"]],
      });

      const response: PaginatedResponse<(typeof rows)[number]> = {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
        data: rows,
      }

      return res.status(200).json(response);

    } catch (error) {
      next(error);
    }
  }

  static async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const produto = await Produto.findByPk(Number(id), {
        include: ["marca", "categoria"],
      });

      if (!produto) {
        throw new HttpError(404, "Produto não encontrado");
      }

      return res.status(200).json(produto);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        nome,
        descricao,
        preco,
        estoque,
        imagem,
        destaque,
        ativo,
        id_marca,
        id_categoria,
      } = req.body;

      const produto = await Produto.create({
        nome,
        descricao,
        preco,
        estoque,
        imagem,
        destaque,
        ativo,
        id_marca,
        id_categoria,
      });

      return res.status(201).json(produto);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const produto = await Produto.findByPk(Number(id));

      if (!produto) {
        throw new HttpError(404, "Produto não encontrado");
      }

      const dados = req.body;

      await produto.update(dados);

      return res.status(200).json(produto);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const produto = await Produto.findByPk(Number(id));

      if (!produto) {
        throw new HttpError(404, "Produto não encontrado");
      }

      await produto.destroy();

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default ProdutoController;
