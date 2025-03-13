import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  //password: "", // Substitua com a sua senha do MySQL
  database: "pizzaria", // Certifique-se de ter criado esse banco de dados
  port: 3306,
});

// Sincronizando o banco de dados
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Banco de dados sincronizado com sucesso!");
  })
  .catch((error: Error) => {
    console.error("Erro ao sincronizar o banco de dados:", error);
  });
