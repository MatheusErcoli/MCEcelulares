import { Request, Response } from "express";
import Categoria from "../models/Categoria";

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
      const { nome, descricao, ativo } = req.body;
      const categoria = await Categoria.create({ nome, descricao, ativo });
      res.status(201).json(categoria);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar categoria" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, descricao, ativo } = req.body;

      const categoria = await Categoria.findByPk(Number(id));

      if (!categoria) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }

      await categoria.update({
        nome,
        descricao,
        ativo,
      });

      return res.status(200).json(categoria);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao atualizar categoria" });
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
