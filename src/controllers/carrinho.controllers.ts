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
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "ID inválido." });
      }

      const carrinho = await Carrinho.findOne({
        where: {
          id_usuario: Number(id),
          ativo: true
        },
        include: [
          {
            association: "itens",
            include: ["produto"]
          }
        ]
      });

      if (!carrinho) {
        return res.status(404).json({ message: "Carrinho não encontrado" });
      }

      return res.status(200).json(carrinho);
    } catch (error) {
      console.error("Erro ao buscar carrinho:", error);
      return res.status(500).json({ message: "Erro interno" });
    }
  }

  static async create(req: Request, res: Response) {
try {
      const { id_usuario } = req.body;

      const [carrinho] = await Carrinho.findOrCreate({
        where: { id_usuario: Number(id_usuario), ativo: true },
        defaults: { id_usuario: Number(id_usuario) }
      });

      return res.status(200).json({ 
        id_carrinho: carrinho.id_carrinho,
        id_usuario: carrinho.id_usuario
      });

    } catch (error) {
      console.error(error, "Erro ao inicializar carrinho." );
      return res.status(500).json({ message: "Erro ao inicializar carrinho." });
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
