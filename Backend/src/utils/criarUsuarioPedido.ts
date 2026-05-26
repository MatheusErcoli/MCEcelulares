import UsuarioPedido from "../models/Usuario_pedido";
import { findByIdOuErroUsuario } from "./FindByIdOuErro/findByIdOuErroUsuario";

export async function criarUsuarioPedido(id_pedido: number, id_usuario: number) {
  const usuario = await findByIdOuErroUsuario(id_usuario);

  return UsuarioPedido.create({
    id_pedido,
    id_usuario,
    nome: usuario.nome,
    email: usuario.email,
    cpf: usuario.cpf,
    telefone: usuario.telefone,
  });
}