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

  static async findById(req: Request, res: Response) {
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
    res.json(produto);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, descricao, preco, estoque, imagem, destaque, ativo, id_marca, id_categoria } = req.body;
    const produtoAtualizado = await Produto.findByPk(Number(id));
    if (produtoAtualizado) {
      await produtoAtualizado.update({
        nome: nome,
        descricao: descricao,
        preco: preco,
        estoque: estoque,
        imagem: imagem,
        destaque: destaque,
        ativo: ativo,
        id_marca: id_marca,
        id_categoria: id_categoria
      });
    } else {
      res.status(404).json({ message: "Produto não encontrado" });
    }
    res.status(200).json(produtoAtualizado);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const produto = await Produto.findByPk(Number(id));
    if (produto) {
      await produto.destroy();
    } else {
      res.status(404).json({ message: "Produto não encontrado" });
    }
    res.status(204).send();
  }
}

export default ProdutoController;
