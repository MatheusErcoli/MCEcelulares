 import { Request, Response } from "express";
import Produto from "../models/Produto";
import Marca from "../models/Marca";
import Categoria from "../models/Categoria";
import { PaginatedResponse } from "../types/paginacao";

class ProdutoController {
static async findAll(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);
    const id_categoria = req.query.id_categoria as string;
    const id_marca = req.query.id_marca as string;
    const destaque = req.query.destaque as string;

    if (page < 1) {
      return res.status(400).json({
        message: "Página inválida",
      });
    }

    const offset = (page - 1) * limit;

    const whereClause: Record<string, any> = {};
    if (id_categoria) {
      whereClause.id_categoria = Number(id_categoria);
    }
    if (id_marca) {
      whereClause.id_marca = Number(id_marca);
    }
    if (destaque === "true") {
      whereClause.destaque = true;
    }

    const { count, rows } = await Produto.findAndCountAll({
      where: whereClause,
      include: ["marca", "categoria"],
      limit,
      offset,
      order: [["id_produto", "ASC"]],
    });

    const response: PaginatedResponse<(typeof rows)[number]> = {
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
      data: rows,
    };
    
    return res.status(200).json(response);
  }
  static async findById(req: Request, res: Response) {
    const { id } = req.params;

    const produto = await Produto.findByPk(Number(id), {
      include: ["marca", "categoria"],
    });

    if (!produto) {
      return res.status(404).json({
        message: "Produto não encontrado",
      });
    }

    return res.status(200).json(produto);
  }

  static async create(req: Request, res: Response) {
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
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;

    const produto = await Produto.findByPk(Number(id));

    if (!produto) {
      return res.status(404).json({
        message: "Produto não encontrado",
      });
    }

    const dados = req.body;

    await produto.update(dados);

    return res.status(200).json(produto);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const produto = await Produto.findByPk(Number(id));

    if (!produto) {
      return res.status(404).json({
        message: "Produto não encontrado",
      });
    }

    await produto.destroy();

    return res.status(204).send();
  }
}

export default ProdutoController;
