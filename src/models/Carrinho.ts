import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Carrinho extends Model {
    public id_carrinho!: number;
    public id_usuario!: number;
    public data_criacao!: Date;
    public ativo!: boolean;
}

Carrinho.init({
    id_carrinho: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data_criacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    tableName: "carrinho",
    timestamps: false
});

export default Carrinho;