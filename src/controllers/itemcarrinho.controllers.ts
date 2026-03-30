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
    try {
      const { id_carrinho, id_produto, preco_unitario} = req.body;

      const exists = await ItemCarrinho.findOne({ where: { id_carrinho, id_produto }});
      if (exists) {
        return res.status(409).json({ 
          message: "Este produto já está no carrinho. Use a rota de update para alterar a quantidade." 
        });
      }

      const novoItemCarrinho = await ItemCarrinho.create({
        id_carrinho,
        id_produto,
        preco_unitario,
        quantidade:1, 
      });

      return res.status(201).json(novoItemCarrinho);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao criar item no carrinho." });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { quantidade } = req.body; 

      const itemCarrinho = await ItemCarrinho.findByPk(Number(id));

      if (!itemCarrinho) {
        return res.status(404).json({ message: "Item não encontrado" });
      }

      if (quantidade !== undefined) {
        const novaQuantidade = itemCarrinho.quantidade + Number(quantidade);

        if (novaQuantidade <= 0) {
          return res.status(400).json({ 
            message: "A quantidade não pode ser menor que 1. Para remover o produto, utilize a rota de DELETE." 
          });
        }

        itemCarrinho.quantidade = novaQuantidade;
      }

      await itemCarrinho.save();
      return res.status(200).json(itemCarrinho);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao atualizar item do carrinho." });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const itemCarrinho = await ItemCarrinho.findByPk(Number(id));

      if (!itemCarrinho) {
        return res.status(404).json({ message: "Item não encontrado" });
      }

      await itemCarrinho.destroy();
      return res.status(204).send();
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao deletar item do carrinho." });
    }
  }
}

export default ItemCarrinhoController;