import ItemCarrinho from "../models/ItemCarrinho";
import Produto from "../models/Produto";

export async function decrementarEstoque(itens: ItemCarrinho[]) {
    for (const item of itens) {
        const produto = (item as any).produto as Produto;
        await produto.update({ estoque: produto.estoque - item.quantidade });
    }
}