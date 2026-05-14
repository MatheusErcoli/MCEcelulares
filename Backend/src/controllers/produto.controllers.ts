import { NextFunction, Request, Response } from "express";
import Produto from "../models/Produto";
import { PaginacaoResponse } from "../types/paginacao";
import { HttpError } from "../types/http_error";
import { obterPaginacao } from "../utils/paginacao";
import { fazerPaginacaoResponse } from "../utils/paginacaoResponse";
import { findByIdOuErroProduto } from "../utils/FindByIdOuErro/findByIdOuErroProduto";
import { adicionarFiltroNumero } from "../utils/adicionarFiltroNumero";
import { adicionarFiltroBoolean } from "../utils/adicionarFiltroBoolean";

class ProdutoController {
static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
        const { page, limit } = obterPaginacao(req.query);
        const where: Record<string, number | boolean> = {};

        adicionarFiltroNumero(where, "id_categoria", req.query.id_categoria as string);
        adicionarFiltroNumero(where, "id_marca", req.query.id_marca as string);
        adicionarFiltroBoolean(where, "destaque", req.query.destaque as string);
        adicionarFiltroBoolean(where, "ativo", req.query.ativo as string);

        const { count, rows } = await Produto.findAndCountAll({
            where,
            include: ["marca", "categoria"],
            limit,
            offset: (page - 1) * limit,
            order: [["id_produto", "DESC"]],
        });

        return res.status(200).json(fazerPaginacaoResponse(page, limit, count, rows));
    } catch (error) {
        next(error);
    }
}

  static async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const produto = await findByIdOuErroProduto(Number(id), {
        include: ["marca", "categoria"],
      });

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

      const produto = await findByIdOuErroProduto(Number(id));

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

      const produto = await findByIdOuErroProduto(Number(id));

      await produto.destroy();

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default ProdutoController;