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
  Categoria.hasMany(Produto, {
    foreignKey: 'id_categoria',
    as: 'produtos'
  });

  Marca.hasMany(Produto, {
    foreignKey: 'id_marca',
    as: 'produtos'
  });

  Produto.belongsTo(Categoria, {
    foreignKey: 'id_categoria',
    as: 'categoria'
  });

  Produto.belongsTo(Marca, {
    foreignKey: 'id_marca',
    as: 'marca'
  });

  Produto.hasMany(ItemCarrinho, {
    foreignKey: 'id_produto',
    as: 'itensCarrinho'
  });

  Usuario.hasMany(Endereco, {
    foreignKey: 'id_usuario',
    as: 'enderecos'
  });

  Usuario.hasMany(Carrinho, {
    foreignKey: 'id_usuario',
    as: 'carrinhos'
  });

  Usuario.hasMany(Pedido, {
    foreignKey: 'id_usuario',
    as: 'pedidos'
  });

  Endereco.hasMany(Pedido, {
    foreignKey: 'id_endereco',
    as: 'pedidos_endereco'
  });

  Endereco.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    as: 'usuario'
  });

  Carrinho.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    as: 'usuario'
  });

  Carrinho.hasMany(ItemCarrinho, {
    foreignKey: 'id_carrinho',
    as: 'itens'
  });

  ItemCarrinho.belongsTo(Carrinho, {
    foreignKey: 'id_carrinho',
    as: 'carrinho'
  });

  ItemCarrinho.belongsTo(Produto, {
    foreignKey: 'id_produto',
    as: 'produto'
  });

  Pedido.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    as: 'usuario'
  });

  Pedido.hasMany(ItemPedido, {
    foreignKey: 'id_pedido',
    as: 'itens'
  });

  Pedido.belongsTo(Endereco, {
    foreignKey: 'id_endereco',
    as: 'endereco'
  });

  Pedido.hasMany(Pagamento, {
    foreignKey: 'id_pedido',
    as: 'pagamentos'
  });

  ItemPedido.belongsTo(Pedido, {
    foreignKey: 'id_pedido',
    as: 'pedido'
  });

  Pagamento.belongsTo(Pedido, {
    foreignKey: 'id_pedido',
    as: 'pedido'
  });
}