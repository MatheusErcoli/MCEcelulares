import { Request, Response, NextFunction } from "express";
import Carrinho from "../models/Carrinho";
import { HttpError } from "../types/http_error";
import { findByIdOuErroCarrinho } from "../utils/FindByIdOuErro/findByIdOuErroCarrinho";

interface AuthenticatedRequest extends Request {
  userId?: number;
  isAdmin?: boolean;
}

class CarrinhoController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const carrinhos = await Carrinho.findAll({
        include: ["usuario"],
      });

      return res.status(200).json(carrinhos);
    } catch (error) {
      next(error);
    }
  }

  static async findById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (req.userId !== Number(id) && !req.isAdmin) {
        return next(new HttpError(403, "Você não tem permissão para acessar este carrinho"));
      }

      const carrinho = await Carrinho.findOne({
        where: { id_usuario: Number(id), ativo: true },
        include: [{ association: "itens", include: ["produto"] }],
      });

      if (!carrinho) return res.status(204).json();

      return res.status(200).json(carrinho);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id_usuario = req.userId;

      const [carrinho] = await Carrinho.findOrCreate({
        where: { id_usuario, ativo: true },
        defaults: { id_usuario },
      });

      return res.status(200).json({ id_carrinho: carrinho.id_carrinho });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const carrinho = await findByIdOuErroCarrinho(Number(id));

      await carrinho.update(req.body);

      return res.status(200).json(carrinho);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const carrinho = await findByIdOuErroCarrinho(Number(id));

      await carrinho.destroy();

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default CarrinhoController;