import { Request, Response } from "express";
import Carrinho from "../models/Carrinho";

class CarrinhoController {
  static async findAll(req: Request, res: Response) {
    const carrinhos = await Carrinho.findAll({
      include: ["usuario"],
    });

    return res.status(200).json(carrinhos);
  }

  static async findById(req: Request, res: Response) {
    const { id } = req.params;

    const carrinho = await Carrinho.findByPk(Number(id), {
      include: ["usuario"],
    });

    if (!carrinho) {
      return res.status(404).json({
        message: "Carrinho não encontrado",
      });
    }

    return res.status(200).json(carrinho);
  }

  static async create(req: Request, res: Response) {
    const { id_usuario, data_criacao, ativo = true } = req.body;

    const novoCarrinho = await Carrinho.create({
      id_usuario,
      data_criacao,
      ativo,
    });

    return res.status(201).json(novoCarrinho);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;

    const carrinho = await Carrinho.findByPk(Number(id));

    if (!carrinho) {
      return res.status(404).json({
        message: "Carrinho não encontrado",
      });
    }

    const dados = req.body;

    await carrinho.update(dados);

    return res.status(200).json(carrinho);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const carrinho = await Carrinho.findByPk(Number(id));

    if (!carrinho) {
      return res.status(404).json({
        message: "Carrinho não encontrado",
      });
    }

    await carrinho.destroy();

    return res.status(204).send();
  }
}

export default CarrinhoController;
