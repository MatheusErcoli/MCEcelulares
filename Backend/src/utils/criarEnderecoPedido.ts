import EnderecoPedido from "../models/Endereco_pedido";
import { findByIdOuErroEndereco } from "./FindByIdOuErro/findByIdOuErroEndereco";

export async function criarEnderecoPedido(id_pedido: number, id_endereco: number) {
  const endereco = await findByIdOuErroEndereco(id_endereco);

  return EnderecoPedido.create({
    id_pedido,
    endereco: endereco.endereco,
    numero: endereco.numero,
    complemento: endereco.complemento,
    bairro: endereco.bairro,
    cidade: endereco.cidade,
    estado: endereco.estado,
    cep: endereco.cep,
  });
}