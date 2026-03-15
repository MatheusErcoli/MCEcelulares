import { Request, Response } from "express";
import Produto from "../models/Produto";
import Marca from "../models/Marca";
import Categoria from "../models/Categoria";

class ProdutoController {
  static async findAll(req: Request, res: Response) {
    const produtos = await Produto.findAll({
      include: [
        { model: Marca, as: "marca" },
        { model: Categoria, as: "categoria" },
      ],
    });

    return res.status(200).json(produtos);
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
