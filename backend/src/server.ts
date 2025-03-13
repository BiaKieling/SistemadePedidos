// Importa as dependências necessárias
import express from "express"; // Framework para construção de APIs
import cors from "cors"; // Middleware para permitir requisições entre diferentes origens (CORS)
import dotenv from "dotenv"; // Biblioteca para gerenciar variáveis de ambiente
import { ordersRoutes } from "./routes/ordersRoutes"; // Roteador de pedidos
import { sequelize } from "./database/configDB"; // Importa a configuração do Sequelize (instância do banco de dados)

// Carrega as variáveis de ambiente a partir do arquivo .env
dotenv.config();

// Cria uma instância do Express para criar o servidor
const app = express();
// Define a porta para o servidor. Se a variável de ambiente PORT não estiver definida, será usada a porta 3000
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permite requisições de diferentes origens
app.use(express.json()); // Middleware para interpretar o corpo das requisições como JSON

// Usa as rotas para pedidos. Define que qualquer requisição para '/orders' será tratada pelas routes em 'ordersRoutes'
app.use("/orders", ordersRoutes);

// Sincroniza o banco de dados antes de iniciar o servidor
sequelize
  .sync({ alter: true }) // O método 'sync' garante que o banco de dados está sincronizado. 'alter' faz a atualização da estrutura do banco se necessário.
  .then(() => {
    // Condicional para garantir que o servidor só será iniciado em ambientes não de teste
    if (process.env.NODE_ENV !== "test") {
      // Inicia o servidor na porta configurada
      app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
      });
    }
  })
  .catch((error: Error) => {
    // Caso haja algum erro ao sincronizar o banco de dados, exibe a mensagem de erro
    console.error("Erro ao sincronizar o banco de dados:", error);
  });

// Exporta o app para ser utilizado em testes (caso seja necessário fazer testes unitários ou integração)
export { app };
