import { Request, Response } from 'express';
import Categoria from '../models/Categoria';

class CategoriaController {

    static async findAll(req: Request, res: Response) {
        const categorias = await Categoria.findAll();
        res.json(categorias);
    }

    static async findById(req: Request, res: Response) {
        const { id } = req.params;
        const categoria = await Categoria.findByPk(Number(id));
        res.json(categoria);
    }

    static async create(req: Request, res: Response) {
        const { nome, descricao, ativo } = req.body;
        const categoria = await Categoria.create({ nome, descricao, ativo });
        res.json(categoria);
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params;
        const { nome, descricao, ativo } = req.body;
        const categoriaAtualizada = await Categoria.findByPk(Number(id));
        if (categoriaAtualizada) {
            await categoriaAtualizada.update({ nome: nome, descricao: descricao, ativo: ativo });
        } else {
            res.status(404).json({ message: "Categoria não encontrada" });
        }
        
         res.status(200).send(categoriaAtualizada);
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;
        const categoria = await Categoria.findByPk(Number(id));
        if (categoria) {
            await categoria.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Categoria não encontrada" });
        }
    }
}

export default CategoriaController;