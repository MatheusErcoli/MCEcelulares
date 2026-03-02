import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Carrinho from "./Carrinho";
import Produto from "./Produto";

class ItemCarrinho extends Model{
    public id_item_carrinho!: number;
    public id_carrinho!: number;
    public id_produto!: number;
    public preco_unitario!: number;
    public quantidade!: number;
}

ItemCarrinho.init({
    id_item_carrinho: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_carrinho: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_produto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    preco_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'item_carrinho',
    timestamps: false
});

ItemCarrinho.belongsTo(Carrinho, {
    foreignKey: 'id_carrinho',
    as: 'carrinho'
});

ItemCarrinho.belongsTo(Produto, {
    foreignKey: 'id_produto',
    as: 'produto'
});


export default ItemCarrinho;