import { Request, Response } from "express";
import Produto from "../models/Produto";
import Marca from "../models/Marca";
import Categoria from "../models/Categoria";
import {
  createProdutoSchema,
  updateProdutoSchema,
} from "../validators/produtoValidator";

class ProdutoController {
  static async findAll(req: Request, res: Response) {
    try {
      const produtos = await Produto.findAll({
        include: [
          { model: Marca, as: "marca" },
          { model: Categoria, as: "categoria" },
        ],
      });

      return res.status(200).json(produtos);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar produtos" });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const produto = await Produto.findByPk(Number(id), {
        include: ["marca", "categoria"],
      });

      if (!produto) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      return res.status(200).json(produto);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar produto" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const data = createProdutoSchema.parse(req.body);

      const {
        nome,
        descricao,
        preco,
        estoque = 0,
        imagem,
        destaque = false,
        ativo = true,
        id_marca,
        id_categoria,
      } = data;

      const produto = await Produto.create({
        nome,
        descricao,
        preco,
        estoque,
        imagem,
        destaque,
        ativo,
        id_marca,
        id_categoria,
      });

      return res.status(201).json(produto);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          message: "Erro de validação",
          errors: error.errors,
        });
      }

      return res.status(500).json({
        message: "Erro ao criar produto",
      });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const dados = updateProdutoSchema.parse(req.body);

      const produto = await Produto.findByPk(Number(id));

      if (!produto) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      await produto.update(dados);

      return res.status(200).json(produto);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          message: "Erro de validação",
          errors: error.errors,
        });
      }

      return res.status(500).json({
        message: "Erro ao atualizar produto",
      });
    }
  }
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const produto = await Produto.findByPk(Number(id));

      if (!produto) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      await produto.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Erro ao deletar produto" });
    }
  }
}

export default ProdutoController;
