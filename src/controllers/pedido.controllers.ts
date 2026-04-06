import { NextFunction, Request, Response } from "express";
import Pedido from "../models/Pedido";
import ItemPedido from "../models/ItemPedido";
import { PaginatedResponse } from "../types/paginated";
import { HttpError } from "../types/http_error";
import ItemCarrinho from "../models/ItemCarrinho";
import Carrinho from "../models/Carrinho";

interface AuthenticatedRequest extends Request {
  userId?: number;
}

class PedidoController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Math.max(1, parseInt(req.query.page as string) || 1);
      const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);

      const { count, rows } = await Pedido.findAndCountAll({
        where: { ativo: true },
        include: [
          "usuario",
          "endereco",
          { association: "itens", include: ["produto"] },
        ],
        distinct: true,
        col: "id_pedido",
        limit,
        offset: (page - 1) * limit,
        order: [["id_pedido", "DESC"]],
      });

      const response: PaginatedResponse<(typeof rows)[number]> = {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
        data: rows,
      };

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const pedido = await Pedido.findByPk(Number(id), {
        include: [
          "usuario",
          "endereco",
          { association: "itens", include: ["produto"] },
        ],
      });

      if (!pedido) throw new HttpError(404, "Pedido não encontrado");

      return res.status(200).json(pedido);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id_usuario = req.userId;
      const { id_endereco, valor_total } = req.body;

      const carrinho = await Carrinho.findOne({ where: { id_usuario } });

      if (!carrinho) throw new HttpError(404, "Carrinho não encontrado");

      const itensCarrinho = await ItemCarrinho.findAll({
        where: { id_carrinho: carrinho.id_carrinho },
      });

      if (itensCarrinho.length === 0) throw new HttpError(400, "Carrinho vazio");

      const pedido = await Pedido.create({ id_usuario, id_endereco, valor_total });

      await ItemPedido.bulkCreate(
        itensCarrinho.map((item) => ({
          id_pedido: pedido.id_pedido,
          id_produto: item.id_produto,
          quantidade: item.quantidade,
          preco_unitario: item.preco_unitario,
        }))
      );

      await Carrinho.destroy({ where: { id_carrinho: carrinho.id_carrinho } });

      return res.status(201).json(pedido);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const pedido = await Pedido.findByPk(Number(id));

      if (!pedido) throw new HttpError(404, "Pedido não encontrado");

      await pedido.update(req.body);

      return res.status(200).json(pedido);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const pedido = await Pedido.findByPk(Number(id));

      if (!pedido) throw new HttpError(404, "Pedido não encontrado");

      await pedido.destroy();

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default PedidoController;