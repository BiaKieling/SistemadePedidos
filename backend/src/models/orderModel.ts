// Importa os módulos necessários do Sequelize para trabalhar com banco de dados
import { Sequelize, DataTypes, Model } from "sequelize";
// Importa a instância de conexão do banco de dados
import { sequelize } from "../database/configDB";

// Define a classe 'Order' que será um modelo para a tabela de pedidos no banco de dados
export class Order extends Model {
  // Definição das propriedades da classe (que serão mapeadas para as colunas da tabela)
  public id!: number; // Identificador do pedido
  public cliente!: string; // Nome do cliente
  public sabor!: string; // Tipo de sabor do pedido
  public status!: string; // Status do pedido (por exemplo, "Em preparo", "Concluído", etc.)
}

// Inicialização do modelo 'Order' com os campos e configurações
Order.init(
  {
    // Definindo a coluna 'cliente' que não pode ser nula
    cliente: {
      type: DataTypes.STRING, // Tipo de dado STRING (texto)
      allowNull: false, // Não pode ser nulo
    },
    // Definindo a coluna 'sabor' que também não pode ser nula
    sabor: {
      type: DataTypes.STRING, // Tipo de dado STRING (texto)
      allowNull: false, // Não pode ser nulo
    },
    // Definindo a coluna 'status' que não pode ser nula e tem um valor padrão
    status: {
      type: DataTypes.STRING, // Tipo de dado STRING (texto)
      allowNull: false, // Não pode ser nulo
      defaultValue: "Em preparo", // Valor padrão inicial para o status
    },
  },
  {
    // Passando a instância do Sequelize para configurar o modelo
    sequelize,
    modelName: "Order", // Nome do modelo
    tableName: "orders", // Nome da tabela no banco de dados
    timestamps: false, // Não será gerado os campos 'createdAt' e 'updatedAt'
  }
);
