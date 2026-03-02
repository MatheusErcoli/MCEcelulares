import { Request, Response } from "express";
import Produto from "../models/Produto";
import Marca from "../models/Marca";
import Categoria from "../models/Categoria";

class ProdutoController {
  static async findAll(req: Request, res: Response) {
    const produtos = await Produto.findAll({
      include: [
        {
          model: Marca,
          as: "marca",
        },
        {
          model: Categoria,
          as: "categoria",
        },
      ],
    });
    res.json(produtos);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const produto = await Produto.findByPk(Number(id), {
      include: ["marca", "categoria"],
    });
    res.json(produto);
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
        id_categoria
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
        id_categoria
    });
    res.json(produto);
  }
}

export default ProdutoController;