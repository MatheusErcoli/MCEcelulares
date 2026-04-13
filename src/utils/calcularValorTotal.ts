import ItemCarrinho from "../models/ItemCarrinho";

export function calcularValorTotal(itens: ItemCarrinho[]): number {
  return itens.reduce(
    (sum: number, item: any) => sum + Number(item.preco_unitario) * Number(item.quantidade),
    0,
  );
}