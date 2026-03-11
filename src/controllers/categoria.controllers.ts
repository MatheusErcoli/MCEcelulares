import { Request, Response } from "express";
import Categoria from "../models/Categoria";
import { createCategoriaSchema, updateCategoriaSchema } from "../validators/categoriaValidator";

class CategoriaController {
  static async findAll(req: Request, res: Response) {
    try {
      const categorias = await Categoria.findAll();
      res.status(200).json(categorias);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar categorias" });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const categoria = await Categoria.findByPk(Number(id));
      if (!categoria) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }
      return res.status(200).json(categoria);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar categoria" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const data = createCategoriaSchema.parse(req.body);

      const { nome, descricao, ativo = true } = data;

      const categoria = await Categoria.create({
        nome,
        descricao,
        ativo,
      });

      return res.status(201).json(categoria);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          message: "Erro de validação",
          errors: error.errors,
        });
      }

      return res.status(500).json({
        message: "Erro ao criar categoria",
      });
    }
  }
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const dados = updateCategoriaSchema.parse(req.body);

      const categoria = await Categoria.findByPk(Number(id));

      if (!categoria) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }

      await categoria.update(dados);

      return res.status(200).json(categoria);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          message: "Erro de validação",
          errors: error.errors,
        });
      }

      return res.status(500).json({
        message: "Erro ao atualizar categoria",
      });
    }
  }
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const categoria = await Categoria.findByPk(Number(id));

      if (!categoria) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }

      await categoria.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Erro ao deletar categoria" });
    }
  }
}

export default CategoriaController;
