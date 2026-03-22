import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Marca extends Model{
    declare id_marca: number;
    declare nome: string;
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

export default Marca;