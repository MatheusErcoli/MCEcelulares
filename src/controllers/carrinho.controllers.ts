import { Request, Response } from "express";
import Carrinho from "../models/Carrinho";
import CartService from "../services/cart.service";

class CarrinhoController {
  static async findAll(req: Request, res: Response) {
    const carrinhos = await Carrinho.findAll({
      include: ["usuario"],
    });

    return res.status(200).json(carrinhos);
  }

static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params; 

      if (!id) {
        return res.status(400).json({ message: "ID do usuário inválido." });
      }

      const carrinho = await CartService.getCompleteCart(Number(id));

      if (!carrinho) {
        return res.status(404).json({ message: "Carrinho não encontrado" });
      }

      return res.status(200).json(carrinho);
    } catch (error) {
      console.error("Erro ao buscar carrinho:", error);
      return res.status(500).json({ message: "Erro interno" });
    }
  }

  static async addItem(req: Request, res: Response) {
    try {
      const { id_usuario, id_produto, quantidade, preco_unitario } = req.body;

      await CartService.addItem(
        Number(id_usuario),
        Number(id_produto),
        Number(quantidade),
        Number(preco_unitario)
      );

      return res.status(200).json({
        success: true,
        message: "Item adicionado ao carrinho!"
      });

    } catch (error) {
      console.error("ERRO FATAL NO BANCO DE DADOS:", error);
      return res.status(500).json({
        message: "Erro ao adicionar item ao carrinho!",
      });
    }
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
