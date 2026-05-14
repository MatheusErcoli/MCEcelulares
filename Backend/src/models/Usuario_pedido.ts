import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class UsuarioPedido extends Model{
    declare id_usuario_pedido: number;
    declare id_pedido: number;
    declare nome: string;
    declare email: string;
    declare cpf: string;
    declare telefone: string;
}

UsuarioPedido.init({
    id_usuario_pedido: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_pedido: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'usuario_pedido',
    timestamps: false
});

export default UsuarioPedido;
