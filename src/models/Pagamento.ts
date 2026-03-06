import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Pagamento extends Model{
    public id_pagamento!: number;
    public id_pedido!: number;
    public metodo_pagamento!: string;
    public valor!: number;
    public data_pagamento!: Date;
    public status!: string;
}

Pagamento.init({
    id_pagamento: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_pedido: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    metodo_pagamento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    data_pagamento: {
        type: DataTypes.DATE,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "PENDENTE"
    }
}, {
    sequelize,
    tableName: 'pagamento',
    timestamps: false
});

export default Pagamento;