import { Request, Response } from "express";
import Pedido from "../models/Pedido";
import Produto from "../models/Produto";
import ItemPedido from "../models/ItemPedido";

class ItemPedidoController {

    static async findAll(req: Request, res: Response){
        const itensPedido = await ItemPedido.findAll({
            include: [
                {model: Pedido, as : 'pedido'},
                {model: Produto, as : 'produto'}
            ]
        });

        res.json(itensPedido);
    }

    static async findById(req: Request, res: Response){
        const { id } = req.params;
        const itemPedido = await ItemPedido.findByPk(Number(id), {
            include: [
                {model: Pedido, as : 'pedido'},
                {model: Produto, as : 'produto'}
            ]
        });

        res.json(itemPedido);
    }

    static async create(req: Request, res: Response){
        const { id_pedido, id_produto, quantidade, preco_unitario } = req.body;

        const itemPedido = await ItemPedido.create({
            id_pedido,
            id_produto,
            quantidade,
            preco_unitario
        });

        res.status(201).json(itemPedido);
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params;
        const { id_pedido, id_produto, quantidade, preco_unitario } = req.body;
        const itemPedidoAtualizado = await ItemPedido.findByPk(Number(id));
        if(itemPedidoAtualizado){
            await itemPedidoAtualizado.update({
                id_pedido: id_pedido,
                id_produto: id_produto,
                quantidade: quantidade,
                preco_unitario: preco_unitario
            });
        } else {
            return res.status(404).json({ message: "Item do pedido não encontrado" });
        }
        res.status(200).json(itemPedidoAtualizado);
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;
        const itemPedido = await ItemPedido.findByPk(Number(id));
        if(itemPedido){
            await itemPedido.destroy();
        } else {
            return res.status(404).json({ message: "Item do pedido não encontrado" });
        }
        res.status(204).send();
    }
}

export default ItemPedidoController;