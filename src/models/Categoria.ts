import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Categoria extends Model {
    declare id_categoria: number;
    declare nome: string;
    declare descricao: string;
    declare ativo: boolean;
}

Categoria.init({
    id_categoria: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    tableName: 'categoria',
    timestamps: false
});

export default Categoria;