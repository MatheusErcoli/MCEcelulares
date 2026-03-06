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
}

export default CarrinhoController;