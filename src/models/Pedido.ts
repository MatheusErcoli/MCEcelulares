import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Pedido extends Model {
  declare id_pedido: number;
  declare id_usuario: number;
  declare id_endereco: number;
  declare data: Date;
  declare valor_total: number;
  declare ativo: boolean;
  declare status: string;
}

Pedido.init(
  {
    id_pedido: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_endereco: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
      type: DataTypes.ENUM(
        "AGUARDANDO_PAGAMENTO",
        "PAGO",
        "ENVIADO",
        "ENTREGUE",
        "CANCELADO",
      ),
      defaultValue: "AGUARDANDO_PAGAMENTO",
    },
  },
  {
    sequelize,
    tableName: "pedido",
    timestamps: false,
  },
);

export default Pedido;