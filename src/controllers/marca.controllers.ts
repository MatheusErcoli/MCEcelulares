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
}

export default MarcaController;