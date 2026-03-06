import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Pedido extends Model {
  public id_pedido!: number;
  public id_usuario!: number;
  public id_funcionario!: number;
  public data!: Date;
  public valor_total!: number;
  public ativo!: boolean;
  public status!: string;
}

Pedido.init({
    id_pedido: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_funcionario: {
      type: DataTypes.INTEGER,
    },
    data: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    valor_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "CRIADO"
    },
  },
  {
    sequelize,
    tableName: "pedido",
    timestamps: false,
});

export default Pedido;
