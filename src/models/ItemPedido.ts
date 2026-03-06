import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class ItemPedido extends Model {
    public id_item!: number;
    public id_pedido!: number;
    public id_produto!: number;
    public quantidade!: number;
    public preco_unitario!: number;
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
