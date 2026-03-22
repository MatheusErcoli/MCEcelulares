import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Pagamento extends Model{
    declare id_pagamento: number;
    declare id_pedido: number;
    declare metodo_pagamento: string;
    declare valor: number;
    declare data_pagamento: Date;
    declare status: string;
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
        type: DataTypes.ENUM(
            "PENDENTE",
            "PROCESSANDO",
            "PAGO",
            "RECUSADO",
            "CANCELADO"
        ),
        defaultValue: "PENDENTE"
    }
}, {
    sequelize,
    tableName: 'pagamento',
    timestamps: false
});

export default Pagamento;