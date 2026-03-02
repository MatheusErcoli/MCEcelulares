import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Usuario from "./Usuario";

class Endereco extends Model{
    public id_endereco!: number;
    public id_cliente!: number;
    public endereco!: string;
    public numero!: string;
    public complemento!: string;
    public bairro!: string;
    public cidade!: string;
    public estado!: string;
    public cep!: string;
}

Endereco.init({
    id_endereco: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_cliente: {
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
    },
    estado: {
        type: DataTypes.STRING,
    },
    cep: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    tableName: 'endereco',
    timestamps: false
});

Endereco.belongsTo(Usuario, {
    foreignKey: "id_cliente",
    as: "usuario"
});

export default Endereco;