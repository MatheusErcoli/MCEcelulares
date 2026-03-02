import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Produto from './Produto';

class Categoria extends Model {
    public id_categoria!: number;
    public nome!: string;
    public descricao!: string;
    public ativo!: boolean;
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

Categoria.hasMany(Produto, {
    foreignKey: "id_categoria",
    as: "produtos"
})

export default Categoria;