import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./database/config/_configDB"; // Importando a conexão do banco
import routes from "./routes/ordersRoutes"; // Importando as rotas

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Teste de conexão com o banco
(async () => {
  try {
    const connection = await connect(); // Obtém conexão do `configDB.ts`
    console.log("✅ Conectado ao MySQL com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar ao MySQL:", error);
  }
})();

// Usar as rotas
app.use("/api", routes);

// Iniciar o servidor HTTP
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

export { app };
