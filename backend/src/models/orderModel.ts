import { Sequelize, DataTypes, Model } from "sequelize";
import { sequelize } from "../database/configDB";

export class Order extends Model {
  public id!: number;
  public cliente!: string;
  public sabor!: string;
  public status!: string; // Adicionando o campo status
}

Order.init(
  {
    cliente: {
      type: DataTypes.STRING,
      allowNull: false, // Cliente não pode ser nulo
    },
    sabor: {
      type: DataTypes.STRING,
      allowNull: false, // Sabor não pode ser nulo
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false, // O status não pode ser nulo
      defaultValue: "Em preparo", // Valor inicial do status
    },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "orders",
    timestamps: false, // Para não registrar createdAt e updatedAt
  }
);
