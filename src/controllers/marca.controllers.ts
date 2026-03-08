import { Request, Response } from "express";
import Marca from "../models/Marca";

class MarcaController {

    static async findAll(req: Request, res: Response) {
        const marcas = await Marca.findAll();
        res.json(marcas);
    }

    static async findById(req: Request, res: Response) {
        const { id } = req.params;
        const marca = await Marca.findByPk(Number(id));
        res.json(marca);
    }

    static async create(req: Request, res: Response) {
        const { nome } = req.body;
        const marca = await Marca.create({ nome });
        res.json(marca);
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params;
        const { nome } = req.body;
        const marcaAtualizada = await Marca.findByPk(Number(id));
        if(marcaAtualizada){
            await marcaAtualizada.update({ nome: nome });
        } else {
            res.status(404).json({ message: "Marca não encontrada" });
        }
        res.status(200).json(marcaAtualizada);
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;
        const marca = await Marca.findByPk(Number(id));
        if (marca) {
            await marca.destroy();
        } else {
            res.status(404).json({ message: "Marca não encontrada" });
        }
        res.status(204).send();
    }
}

export default MarcaController;