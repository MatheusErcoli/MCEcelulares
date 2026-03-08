import { Request, Response } from "express";
import ItemCarrinho from "../models/ItemCarrinho";

class ItemCarrinhoController {

    static async findAll(req: Request, res: Response) {
        const itensCarrinho = await ItemCarrinho.findAll({
            include: ["carrinho", "produto"]
        });
    
        res.json(itensCarrinho);
    }

    static async findById(req: Request, res: Response) {
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

    static async update(req: Request, res: Response) {
        const { id } = req.params;
        const {
            id_carrinho,
            id_produto,
            preco_unitario,
            quantidade
        } = req.body;

        const itemCarrinhoAtualizado = await ItemCarrinho.findByPk(Number(id));
        if(itemCarrinhoAtualizado){
            await itemCarrinhoAtualizado.update({
                id_carrinho: id_carrinho,
                id_produto: id_produto,
                preco_unitario: preco_unitario,
                quantidade: quantidade
            });
        } else {
            return res.status(404).json({ message: "Item do carrinho não encontrado" });
        }
        res.status(200).json(itemCarrinhoAtualizado);
    }  

    static async delete(req: Request, res: Response) {
        const { id } = req.params;
        const itemCarrinho = await ItemCarrinho.findByPk(Number(id));
        if(itemCarrinho){
            await itemCarrinho.destroy();
        } else {
            return res.status(404).json({ message: "Item do carrinho não encontrado" });
        }
        res.status(204).send();
    }
}

export default ItemCarrinhoController;