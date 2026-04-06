import { Request, Response, NextFunction } from "express";
import Carrinho from "../models/Carrinho";
import { HttpError } from "../types/http_error";

interface AuthenticatedRequest extends Request {
  userId?: number;
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

  static async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const carrinho = await Carrinho.findOne({
        where: { id_usuario: Number(id), ativo: true },
        include: [{ association: "itens", include: ["produto"] }],
      });

      if (!carrinho) throw new HttpError(404, "Carrinho não encontrado");

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

      const carrinho = await Carrinho.findByPk(Number(id));

      if (!carrinho) throw new HttpError(404, "Não foi possível atualizar: Carrinho não encontrado");

      await carrinho.update(req.body);

      return res.status(200).json(carrinho);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const carrinho = await Carrinho.findByPk(Number(id));

      if (!carrinho) throw new HttpError(404, "Não foi possível excluir: Carrinho não encontrado");

      await carrinho.destroy();

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default CarrinhoController;