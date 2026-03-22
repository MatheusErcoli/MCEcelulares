import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class ItemPedido extends Model {
    declare id_item: number;
    declare id_pedido: number;
    declare id_produto: number;
    declare quantidade: number;
    declare preco_unitario: number;
}

ItemPedido.init({
    id_item: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_pedido: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_produto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    preco_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    sequelize,
    tableName: "item_pedido",
    timestamps: false
});

export default ItemPedido;
