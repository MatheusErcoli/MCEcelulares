import { NextFunction, Request, Response } from "express";
import ItemCarrinho from "../models/ItemCarrinho";
import { HttpError } from "../types/http_error";

class ItemCarrinhoController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const itensCarrinho = await ItemCarrinho.findAll({
        include: ["carrinho", "produto"],
      });

      return res.status(200).json(itensCarrinho);
    } catch (error) {
      next(error)
    }
  }

  static async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const itemCarrinho = await ItemCarrinho.findByPk(Number(id), {
        include: ["carrinho", "produto"],
      });

      if (!itemCarrinho) throw new HttpError(404, "Item do carrinho não encontrado");

      return res.status(200).json(itemCarrinho);
    } catch (error) {
      next(error)
    }
  }

  static async findByCartId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_carrinho } = req.params;

      const itens = await ItemCarrinho.findAll({
        where: { id_carrinho: Number(id_carrinho) },
        include: ["carrinho", "produto"],
      });

      return res.status(200).json(itens);
    } catch (error) {
      next(error)
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_carrinho, id_produto, preco_unitario } = req.body;

      const exists = await ItemCarrinho.findOne({ where: { id_carrinho, id_produto } });

      if (exists) {
        exists.quantidade += 1;
        await exists.save();

        return res.status(200).json(exists);
      }

      const itemCarrinho = await ItemCarrinho.create({
        id_carrinho,
        id_produto,
        preco_unitario,
        quantidade: 1
      });

      return res.status(201).json({
        id_produto: itemCarrinho.id_produto,
        preco_unitario: itemCarrinho.preco_unitario
      });

    } catch (error) {
      next(error)
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { quantidade } = req.body;

      const itemCarrinho = await ItemCarrinho.findByPk(Number(id));

      if (!itemCarrinho) throw new HttpError(404, "Erro ao atualizar: Item do carrinho não encontrado");

      if (quantidade !== undefined) {
        const novaQuantidade = itemCarrinho.quantidade + Number(quantidade);

        if (novaQuantidade <= 0) {
          await itemCarrinho.destroy();
          return res.status(204).send();
        }

        itemCarrinho.quantidade = novaQuantidade;
      }

      await itemCarrinho.save();

      return res.status(200).json({
        id_item_carrinho: itemCarrinho.id_item_carrinho,
        quantidade: itemCarrinho.quantidade,
      });


    } catch (error) {
      next(error)
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const itemCarrinho = await ItemCarrinho.findByPk(Number(id));

      if (!itemCarrinho) throw new HttpError(404, "Item do carrinho não encontrado");

      await itemCarrinho.destroy();
      return res.status(204).send();

    } catch (error) {
      next(error)
    }
  }
}

export default ItemCarrinhoController;