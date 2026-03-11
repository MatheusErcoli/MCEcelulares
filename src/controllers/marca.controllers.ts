import { Request, Response } from "express";
import Marca from "../models/Marca";
import {
  createMarcaSchema,
  updateMarcaSchema,
} from "../validators/marcaValidator";

class MarcaController {
  static async findAll(req: Request, res: Response) {
    try {
      const marcas = await Marca.findAll();

      return res.status(200).json(marcas);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar marcas" });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const marca = await Marca.findByPk(Number(id));

      if (!marca) {
        return res.status(404).json({ message: "Marca não encontrada" });
      }

      return res.status(200).json(marca);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar marca" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const data = createMarcaSchema.parse(req.body);

      const { nome } = data;

      const marca = await Marca.create({
        nome,
      });

      return res.status(201).json(marca);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          message: "Erro de validação",
          errors: error.errors,
        });
      }

      return res.status(500).json({
        message: "Erro ao criar marca",
      });
    }
  }
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const dados = updateMarcaSchema.parse(req.body);

      const marca = await Marca.findByPk(Number(id));

      if (!marca) {
        return res.status(404).json({ message: "Marca não encontrada" });
      }

      await marca.update(dados);

      return res.status(200).json(marca);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          message: "Erro de validação",
          errors: error.errors,
        });
      }

      return res.status(500).json({
        message: "Erro ao atualizar marca",
      });
    }
  }
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const marca = await Marca.findByPk(Number(id));

      if (!marca) {
        return res.status(404).json({ message: "Marca não encontrada" });
      }

      await marca.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Erro ao deletar marca" });
    }
  }
}

export default MarcaController;
