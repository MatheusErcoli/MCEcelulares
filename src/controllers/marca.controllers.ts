import { Request, Response } from "express";
import Marca from "../models/Marca";
import Produto from "../models/Produto";
 
class MarcaController {
  static async findAll(req: Request, res: Response) {
    try {
      const id_categoria = req.query.id_categoria ? Number(req.query.id_categoria) : "undefined";
 
      const queryOptions: any = {};
 
      if (id_categoria) {
        queryOptions.include = [
          {
            model: Produto,
            as: 'produtos',
            where: { id_categoria: Number(id_categoria) },
            attributes: [],
            required: true
          }
        ];
      }
 
      const marcas = await Marca.findAll(queryOptions);
 
      return res.status(200).json(marcas);
    } catch (error) {
      console.error("Erro ao buscar marcas:", error);
      return res.status(500).json({ message: "Erro interno" });
    }
  }
 
  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
 
      if (!id) {
        return res.status(400).json({ message: "ID inválido." });
      }
 
      const marca = await Marca.findByPk(Number(id));
 
      if (!marca) {
        return res.status(404).json({ message: "Marca não encontrada" });
      }
 
      return res.status(200).json(marca);
    } catch (error) {
      console.error("Erro ao buscar marca:", error);
      return res.status(500).json({ message: "Erro interno" });
    }
  }
 
  static async create(req: Request, res: Response) {
    const { nome } = req.body;
 
    const marca = await Marca.create({ nome });
 
    return res.status(201).json(marca);
  }
 
  static async update(req: Request, res: Response) {
    const { id } = req.params;
 
    const marca = await Marca.findByPk(Number(id));
 
    if (!marca) {
      return res.status(404).json({ message: "Marca não encontrada" });
    }
 
    await marca.update(req.body);
 
    return res.status(200).json(marca);
  }
 
  static async delete(req: Request, res: Response) {
    const { id } = req.params;
 
    const marca = await Marca.findByPk(Number(id));
 
    if (!marca) {
      return res.status(404).json({ message: "Marca não encontrada" });
    }
 
    await marca.destroy();
 
    return res.status(204).send();
  }
}
 
export default MarcaController;