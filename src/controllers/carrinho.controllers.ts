import { Request, Response } from "express";
import Carrinho from "../models/Carrinho";

class CarrinhoController {

    static async findAll(req: Request, res: Response) {
        const carrinhos = await Carrinho.findAll({
            include: ["usuario"]
        });

        res.json(carrinhos);
    }

    static async findById(req: Request, res: Response) {
        const { id } = req.params;

        const carrinho = await Carrinho.findByPk(Number(id), {
            include: ["usuario"]
        });

        res.json(carrinho);
    }

    static async create(req: Request, res: Response) {
        const {
            id_usuario,
            data_criacao,
            ativo
        } = req.body;

        const novoCarrinho = await Carrinho.create({
            id_usuario,
            data_criacao,
            ativo
        });

        res.json(novoCarrinho);
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;
        const carrinho = await Carrinho.findByPk(Number(id));

        if (carrinho){
            await carrinho.destroy();
        } else {
            res.status(404).json({ message: "Carrinho não encontrado" });
        }

        res.status(204).send();
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params;
        const { id_usuario, data_criacao, ativo } = req.body;

        const carrinhoAtualizado = await Carrinho.findByPk(Number(id));
        if (carrinhoAtualizado) {
            await carrinhoAtualizado.update({
                id_usuario: id_usuario,
                data_criacao: data_criacao,
                ativo: ativo
            });
        } else {
            res.status(404).json({ message: "Carrinho não encontrado" });
        }

         res.status(200).json(carrinhoAtualizado);
    }
}

export default CarrinhoController;