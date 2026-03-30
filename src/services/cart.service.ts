import Carrinho from "../models/Carrinho";
import ItemCarrinho from "../models/ItemCarrinho";

export default class CartService {

    private static async getOrCreateActiveCart(id_usuario: number, data_criacao?: Date, ativo: boolean = true) {
        const [cart] = await Carrinho.findOrCreate({
            where: { id_usuario, ativo: true },
            defaults: { id_usuario, data_criacao, ativo }
        });
        return cart;
    }

    static async getCompleteCart(id_usuario: number, data_criacao?: Date, ativo: boolean = true) {
        const cart = await this.getOrCreateActiveCart(id_usuario, data_criacao, ativo);
        const id_carrinho = cart.get("id_carrinho");

        return await Carrinho.findByPk(id_carrinho, {
            include: [
                {
                    association: "itens",
                    include: ["produto"]
                }
            ]
        });
    }

    static async addItem(id_usuario: number, id_produto: number, quantidade: number, preco_unitario: number) {
        const cart = await this.getOrCreateActiveCart(id_usuario);
        const id_carrinho = cart.get("id_carrinho");

        const existingItem = await ItemCarrinho.findOne({ where: { id_carrinho, id_produto } });

        if (existingItem) {
            existingItem.quantidade += quantidade;
            if (existingItem.quantidade <= 0) {
                return await existingItem.destroy();
            }
            return await existingItem.save();
        }

        return await ItemCarrinho.create({ id_carrinho, id_produto, quantidade: 1, preco_unitario });
    }
}