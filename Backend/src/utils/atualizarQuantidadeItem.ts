import ItemCarrinho from "../models/ItemCarrinho";

export async function atualizarQuantidadeItem(itemCarrinho: ItemCarrinho, quantidade?: number) {
  if (quantidade === undefined) return { removido: false };

  const novaQuantidade = itemCarrinho.quantidade + Number(quantidade);

  if (novaQuantidade <= 0) {
    await itemCarrinho.destroy();
    return { removido: true };
  }

  itemCarrinho.quantidade = novaQuantidade;
  return { removido: false };
}