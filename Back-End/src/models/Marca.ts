import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Produto from "./Produto";

class Marca extends Model{
    public id_marca!: number;
    public nome!: string;
}

Marca.init({
    id_marca: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "marca",
    timestamps: false
});

Marca.hasMany(Produto, {
    foreignKey: "id_marca",
    as: "produtos"
});


export default Marca;