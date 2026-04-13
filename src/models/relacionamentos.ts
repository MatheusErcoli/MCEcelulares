import Categoria from './Categoria';
import Marca from './Marca';
import Produto from './Produto';
import Usuario from './Usuario';
import Carrinho from './Carrinho';
import ItemCarrinho from './ItemCarrinho';
import Endereco from './Endereco';
import Pedido from './Pedido';
import ItemPedido from './ItemPedido';
import Pagamento from './Pagamento';

export function EstablishRelations() {
  // Categoria -> Produto (one-to-many)
  Categoria.hasMany(Produto, {
    foreignKey: 'id_categoria',
    as: 'produtos'
  });

  // Marca -> Produto (one-to-many)
  Marca.hasMany(Produto, {
    foreignKey: 'id_marca',
    as: 'produtos'
  });

  // Produto -> Categoria (many-to-one)
  Produto.belongsTo(Categoria, {
    foreignKey: 'id_categoria',
    as: 'categoria'
  });

  // Produto -> Marca (many-to-one)
  Produto.belongsTo(Marca, {
    foreignKey: 'id_marca',
    as: 'marca'
  });

  // Produto -> ItemCarrinho (one-to-many)
  Produto.hasMany(ItemCarrinho, {
    foreignKey: 'id_produto',
    as: 'itensCarrinho'
  });

  // Usuario -> Endereco (one-to-many)
  Usuario.hasMany(Endereco, {
    foreignKey: 'id_usuario',
    as: 'enderecos'
  });

  // Usuario -> Carrinho (one-to-many)
  Usuario.hasMany(Carrinho, {
    foreignKey: 'id_usuario',
    as: 'carrinhos'
  });

  // Usuario -> Pedido (one-to-many)
  Usuario.hasMany(Pedido, {
    foreignKey: 'id_usuario',
    as: 'pedidos'
  });

  // Endereco -> Pedido (one-to-many)
  Endereco.hasMany(Pedido, {
    foreignKey: 'id_endereco',
    as: 'pedidos_endereco'
  });

  // Endereco -> Usuario (many-to-one)
  Endereco.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    as: 'usuario'
  });

  // Carrinho -> Usuario (many-to-one)
  Carrinho.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    as: 'usuario'
  });

  // Carrinho -> ItemCarrinho (one-to-many)
  Carrinho.hasMany(ItemCarrinho, {
    foreignKey: 'id_carrinho',
    as: 'itens'
  });

  // ItemCarrinho -> Carrinho (many-to-one)
  ItemCarrinho.belongsTo(Carrinho, {
    foreignKey: 'id_carrinho',
    as: 'carrinho'
  });

  // ItemCarrinho -> Produto (many-to-one)
  ItemCarrinho.belongsTo(Produto, {
    foreignKey: 'id_produto',
    as: 'produto'
  });

  // Pedido -> Usuario (many-to-one)
  Pedido.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    as: 'usuario'
  });

  // Pedido -> ItemPedido (one-to-many)
  Pedido.hasMany(ItemPedido, {
    foreignKey: 'id_pedido',
    as: 'itens'
  });

  // Pedido -> Endereco (many-to-one)
  Pedido.belongsTo(Endereco, {
    foreignKey: 'id_endereco',
    as: 'endereco'
  });

  // CORRIGIDO: relacionamento faltando — Pedido -> Pagamento (one-to-many)
  Pedido.hasMany(Pagamento, {
    foreignKey: 'id_pedido',
    as: 'pagamentos'
  });

  // ItemPedido -> Pedido (many-to-one)
  ItemPedido.belongsTo(Pedido, {
    foreignKey: 'id_pedido',
    as: 'pedido'
  });

  // Pagamento -> Pedido (many-to-one)
  Pagamento.belongsTo(Pedido, {
    foreignKey: 'id_pedido',
    as: 'pedido'
  });
}