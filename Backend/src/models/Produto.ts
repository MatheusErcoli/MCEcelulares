import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Produto extends Model {
    declare id_produto: number;
    declare nome: string;
    declare descricao: string | null;
    declare preco: number;
    declare estoque: number;
    declare imagem: string | null;
    declare destaque: boolean;
    declare ativo: boolean;
    declare id_marca: number;
    declare id_categoria: number;
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
        allowNull: false
    },
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'produto',
    timestamps: false
});

Produto.addHook('beforeSave', (produto: Produto) => {
    if (produto.estoque <= 0) {
        produto.ativo = false;
    } else if (produto.changed('estoque') && produto.estoque > 0 && !produto.ativo) {
        produto.ativo = true;
    }
});

export default Produto;