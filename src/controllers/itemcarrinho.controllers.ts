import { Request, Response } from "express";
import ItemCarrinho from "../models/ItemCarrinho";

class ItemCarrinhoController {

    static async findAll(req: Request, res: Response) {
        const itensCarrinho = await ItemCarrinho.findAll({
            include: ["carrinho", "produto"]
        });
    
        res.json(itensCarrinho);
    }

    static async getById(req: Request, res: Response) {
        const { id } = req.params;

        const itemCarrinho = await ItemCarrinho.findByPk(Number(id), {
            include: ["carrinho", "produto"]
        });

        res.json(itemCarrinho);
    }

    static async create(req: Request, res: Response) {  
        const {
            id_carrinho,
            id_produto,
            preco_unitario,
            quantidade
        } = req.body;

        const novoItemCarrinho = await ItemCarrinho.create({
            id_carrinho,
            id_produto,
            preco_unitario,
            quantidade
        });

        res.json(novoItemCarrinho);
    }
}

export default ItemCarrinhoController;