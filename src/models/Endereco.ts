import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Endereco extends Model{
    declare id_endereco: number;
    declare id_usuario: number;
    declare endereco: string;
    declare numero: string;
    declare complemento: string | null;
    declare bairro: string | null;
    declare cidade: string;
    declare estado: string | null;
    declare cep: string;
}

Endereco.init({
    id_endereco: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_usuario: {
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
    tableName: 'endereco',
    timestamps: false
});

export default Endereco;
