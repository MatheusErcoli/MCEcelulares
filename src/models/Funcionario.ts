import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Funcionario extends Model {
    declare id_funcionario: number;
    declare nome: string;
    declare email: string
    declare telefone: string;
    declare cargo: string;
    declare data_admissao: Date | null;
    declare salario: number;
    declare ativo: boolean;
}

Funcionario.init({
    id_funcionario: {
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
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cargo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_admissao: {
        type: DataTypes.DATE,
    },
    salario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "funcionario",
    timestamps: false
});


export default Funcionario;
