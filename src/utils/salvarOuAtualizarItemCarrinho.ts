import ItemCarrinho from "../models/ItemCarrinho";

export async function salvarOuAtualizarItemCarrinho(id_carrinho: number, id_produto: number, preco_unitario: number) {
    const exists = await ItemCarrinho.findOne({ where: { id_carrinho, id_produto } });

    if (exists) {
        exists.quantidade += 1;
        await exists.save();
        return { item: exists, criado: false };
    }

    const item = await ItemCarrinho.create({ id_carrinho, id_produto, preco_unitario, quantidade: 1 });
    return { item, criado: true };
}