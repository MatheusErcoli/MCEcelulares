import { NextFunction, Request, Response } from "express";
import ItemCarrinho from "../models/ItemCarrinho";
import { HttpError } from "../types/http_error";
import { findByIdOuErroItemCarrinho } from "../utils/FindByIdOuErro/findByIdOuErroItemCarrinho";
import { findByIdOuErroProduto } from "../utils/FindByIdOuErro/findByIdOuErroProduto";
import { atualizarQuantidadeItem } from "../utils/atualizarQuantidadeItem";
import { validarProdutoDisponivel } from "../utils/validarProdutoDisponivel";
import { upsertItemCarrinho } from "../utils/upsertItemCarrinho";

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

      const itemCarrinho = await findByIdOuErroItemCarrinho(Number(id), {
        include: ["carrinho", "produto"],
      });

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

      const produto = await findByIdOuErroProduto(Number(id_produto));
      validarProdutoDisponivel(produto);

      const { item, criado } = await upsertItemCarrinho(id_carrinho, id_produto, preco_unitario);

      return res.status(criado ? 201 : 200).json({
        id_produto: item.id_produto,
        preco_unitario: item.preco_unitario,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { quantidade } = req.body;

      const itemCarrinho = await findByIdOuErroItemCarrinho(Number(id));

      const { removido } = await atualizarQuantidadeItem(itemCarrinho, quantidade);

      if (removido){
        return res.status(204).send();
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
      const itemCarrinho = await findByIdOuErroItemCarrinho(Number(id));

      await itemCarrinho.destroy();
      return res.status(204).send();

    } catch (error) {
      next(error)
    }
  }
}

export default ItemCarrinhoController;