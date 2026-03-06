import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Produto extends Model {
    public id_produto!: number;
    public nome!: string;
    public descricao!: string;
    public preco!: number;
    public imagem!: string;
    public destaque!: boolean;
    public ativo!: boolean;
    public id_marca!: number;
    public id_categoria!: number;
}

Produto.init({
    id_produto: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    estoque: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: true
    },
    destaque: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    id_marca: {
        type: DataTypes.INTEGER,
    },
    id_categoria: {
        type: DataTypes.INTEGER,
    }
}, {
    sequelize,
    tableName: 'produto',
    timestamps: false
});

export default Produto;
