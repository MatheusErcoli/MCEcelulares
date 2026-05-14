import ItemCarrinho from "../models/ItemCarrinho";
import ItemPedido from "../models/ItemPedido";

export async function criarItensPedido(id_pedido: number, itens: ItemCarrinho[]) {
  await ItemPedido.bulkCreate(
    itens.map((item: any) => ({
      id_pedido,
      nome_produto: item.produto.nome,
      quantidade: item.quantidade,
      preco_unitario: item.preco_unitario,
    })),
  );
}