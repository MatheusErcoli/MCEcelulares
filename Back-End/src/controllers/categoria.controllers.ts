import { Request, Response } from 'express';
import Categoria from '../models/Categoria';

class CategoriaController {

    static async findAll(req: Request, res: Response) {
        const categorias = await Categoria.findAll();
        res.json(categorias);
    }

    static async getById(req: Request, res: Response) {
        const { id } = req.params;
        const categoria = await Categoria.findByPk(Number(id));
        res.json(categoria);
    }

    static async create(req: Request, res: Response) {
        const { nome, descricao, ativo } = req.body;
        const categoria = await Categoria.create({ nome, descricao, ativo });
        res.json(categoria);
    }
}

export default CategoriaController;