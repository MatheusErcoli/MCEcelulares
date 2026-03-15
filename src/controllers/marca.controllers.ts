import { Request, Response } from "express";
import Marca from "../models/Marca";

class MarcaController {
  static async findAll(req: Request, res: Response) {
    const marcas = await Marca.findAll();

    return res.status(200).json(marcas);
  }

  static async findById(req: Request, res: Response) {
    const { id } = req.params;

    const marca = await Marca.findByPk(Number(id));

    if (!marca) {
      return res.status(404).json({
        message: "Marca não encontrada",
      });
    }

    return res.status(200).json(marca);
  }

  static async create(req: Request, res: Response) {
    const { nome } = req.body;

    const marca = await Marca.create({
      nome,
    });

    return res.status(201).json(marca);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;

    const marca = await Marca.findByPk(Number(id));

    if (!marca) {
      return res.status(404).json({
        message: "Marca não encontrada",
      });
    }

    const dados = req.body;

    await marca.update(dados);

    return res.status(200).json(marca);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const marca = await Marca.findByPk(Number(id));

    if (!marca) {
      return res.status(404).json({
        message: "Marca não encontrada",
      });
    }

    await marca.destroy();

    return res.status(204).send();
  }
}

export default MarcaController;
