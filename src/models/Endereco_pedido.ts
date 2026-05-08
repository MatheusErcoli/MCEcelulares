import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class EnderecoPedido extends Model{
    declare id_endereco_pedido: number;
    declare id_pedido: number;
    declare endereco: string;
    declare numero: string;
    declare complemento: string;
    declare bairro: string;
    declare cidade: string;
    declare estado: string;
    declare cep: string;
}

EnderecoPedido.init({
    id_endereco_pedido: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_pedido: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    complemento: {
        type: DataTypes.STRING,
    },
    bairro: {
        type: DataTypes.STRING,
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'endereco_pedido',
    timestamps: false
});

export default EnderecoPedido;