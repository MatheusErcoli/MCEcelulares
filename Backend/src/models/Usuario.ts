import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Usuario extends Model{
    declare id_usuario: number;
    declare nome: string;
    declare email: string;
    declare senha: string;
    declare cpf: string;
    declare telefone: string;
    declare ativo: boolean;
    declare admin: boolean;
}

Usuario.init({
    id_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize,
    tableName: "usuario",
    timestamps: false
});

export default Usuario;
