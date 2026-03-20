import { Request, Response } from "express";
import Produto from "../models/Produto";
import Marca from "../models/Marca";
import Categoria from "../models/Categoria";

class ProdutoController {
  static async findAll(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);

    if (page < 1) {
      return res.status(400).json({
        message: "Página inválida",
      });
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Produto.findAndCountAll({
      include: [
        { model: Marca, as: "marca" },
        { model: Categoria, as: "categoria" },
      ],
      limit,
      offset,
      order: [["id", "ASC"]],
    });

    return res.status(200).json({
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
      data: rows,
    });
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
