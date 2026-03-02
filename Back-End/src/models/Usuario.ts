import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Endereco from "./Endereco";

class Usuario extends Model{
    public id_usuario!: number;
    public nome!: string;
    public email!: string;
    public senha!: string;
    public cpf!: string;
    public telefone!: string;
    public ativo!: boolean;
    public admin!: boolean;
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

Usuario.hasMany(Endereco, {
    foreignKey: "id_cliente",
    as: "enderecos"
});

export default Usuario;