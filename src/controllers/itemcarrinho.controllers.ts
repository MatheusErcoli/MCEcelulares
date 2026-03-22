import { Request, Response } from "express";
import ItemCarrinho from "../models/ItemCarrinho";

class ItemCarrinhoController {
  static async findAll(req: Request, res: Response) {
    const itensCarrinho = await ItemCarrinho.findAll({
      include: ["carrinho", "produto"],
    });

    return res.status(200).json(itensCarrinho);
  }

  static async findById(req: Request, res: Response) {
    const { id } = req.params;

    const itemCarrinho = await ItemCarrinho.findByPk(Number(id), {
      include: ["carrinho", "produto"],
    });

    if (!itemCarrinho) {
      return res.status(404).json({
        message: "Item do carrinho não encontrado",
      });
    }

    return res.status(200).json(itemCarrinho);
  }

  static async findByCartId(req: Request, res: Response) {
    const { id_carrinho } = req.params;

    const itens = await ItemCarrinho.findAll({
      where: { id_carrinho: Number(id_carrinho) },
      include: ["carrinho", "produto"],
    });

    return res.status(200).json(itens);
  }

  static async create(req: Request, res: Response) {
    const { id_carrinho, id_produto, preco_unitario, quantidade } = req.body;

    const novoItemCarrinho = await ItemCarrinho.create({
      id_carrinho,
      id_produto,
      preco_unitario,
      quantidade,
    });

    return res.status(201).json(novoItemCarrinho);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;

    const itemCarrinho = await ItemCarrinho.findByPk(Number(id));

    if (!itemCarrinho) {
      return res.status(404).json({
        message: "Item do carrinho não encontrado",
      });
    }

    const dados = req.body;

    await itemCarrinho.update(dados);

    return res.status(200).json(itemCarrinho);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const itemCarrinho = await ItemCarrinho.findByPk(Number(id));

    if (!itemCarrinho) {
      return res.status(404).json({
        message: "Item do carrinho não encontrado",
      });
    }

    await itemCarrinho.destroy();

    return res.status(204).send();
  }
}

export default ItemCarrinhoController;