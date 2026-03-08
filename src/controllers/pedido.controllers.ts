import { Request, Response } from "express";
import Pedido from "../models/Pedido";
import Usuario from "../models/Usuario";
import Funcionario from "../models/Funcionario";
import { Model } from "sequelize";
import ItemCarrinho from "../models/ItemCarrinho";
import ItemPedido from "../models/ItemPedido";

class PedidoController {

    static async findAll(req: Request, res: Response){
        const pedidos = await Pedido.findAll({
            where: {
                ativo: true
            },
            include: [
                {model: Usuario, as : 'usuario'},
                {model: Funcionario, as : 'funcionario'},
                {model: ItemPedido, as : 'itens'}
            ]
        });

        res.json(pedidos);
    }

    static async findById(req: Request, res: Response){
        const { id } = req.params;

        const pedido = await Pedido.findByPk(Number(id), {
            include: [
                {model: Usuario, as : 'usuario'},
                {model: Funcionario, as : 'funcionario'},
                {model: ItemPedido, as : 'itens'}
            ]
        });

        res.json(pedido);
    }

    static async create(req: Request, res: Response){
        const { id_usuario, id_funcionario, data, valor_total } = req.body;

        const pedido = await Pedido.create({
            id_usuario,
            id_funcionario,
            valor_total,
            data,
            ativo: true,
            status: "CRIADO"
        });

        res.status(201).json(pedido);
    }

    static async update(req: Request, res: Response){
        const { id } = req.params;
        const { id_usuario, id_funcionario, data, valor_total, status } = req.body;
        const pedidoAtualizado = await Pedido.findByPk(Number(id));
        if(pedidoAtualizado){
            await pedidoAtualizado.update({
                id_usuario: id_usuario,
                id_funcionario: id_funcionario,
                data: data,
                valor_total: valor_total,
                status: status
            });
        } else {
            res.status(404).json({ message: "Pedido não encontrado" });
        }
        res.status(200).json(pedidoAtualizado);
    }

    static async delete(req: Request, res: Response){
        const { id } = req.params;
        const pedido = await Pedido.findByPk(Number(id));
        if(pedido){
            await pedido.destroy();
        } else {
            res.status(404).json({ message: "Pedido não encontrado" });
        }
        res.status(204).send();
    }

}

export default PedidoController;