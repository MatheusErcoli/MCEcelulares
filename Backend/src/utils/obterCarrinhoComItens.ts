import Carrinho from "../models/Carrinho";
import ItemCarrinho from "../models/ItemCarrinho";
import { carrinhoNaoEncontrado } from "./carrinhoNaoEncontrado";
import { carrinhoVazio } from "./carrinhoVazio";
import { validarItensCarrinho } from "./validarItensCarrinho";

export async function obterCarrinhoComItens(id_usuario: number) {
  const carrinho = carrinhoNaoEncontrado(
    await Carrinho.findOne({ where: { id_usuario, ativo: true } }),
  );

  const itensCarrinho = await ItemCarrinho.findAll({
    where: { id_carrinho: carrinho.id_carrinho },
    include: ["produto"],
  });

  carrinhoVazio(itensCarrinho);
  validarItensCarrinho(itensCarrinho);

  return { carrinho, itensCarrinho };
}