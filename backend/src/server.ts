import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ordersRoutes } from "./routes/ordersRoutes";
import { sequelize } from "./database/configDB"; // Importe a configuração do Sequelize

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Usando a rota para pedidos
app.use("/orders", ordersRoutes);

// Sincronizando o banco de dados antes de iniciar o servidor
sequelize
  .sync({ alter: true }) // Aqui você garante que o banco de dados estará sincronizado
  .then(() => {
    if (process.env.NODE_ENV !== "test") {
      app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
      });
    }
  })
  .catch((error: Error) => {
    console.error("Erro ao sincronizar o banco de dados:", error);
  });

// Exporta o `app` para ser usado nos testes
export { app };
