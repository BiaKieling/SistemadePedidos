// Importa a classe Sequelize do pacote sequelize para interagir com o banco de dados
import { Sequelize } from "sequelize";

// Cria uma instância do Sequelize, que será usada para se conectar ao banco de dados MySQL
export const sequelize = new Sequelize({
  dialect: "mysql", // Define o tipo de banco de dados como MySQL
  host: "localhost", // Define o endereço do servidor do banco de dados (localhost indica que está rodando localmente)
  username: "root", // Usuário do banco de dados (normalmente, 'root' em instalações locais)
  //password: "", // A senha foi comentada, mas deve ser definida aqui se houver uma senha no banco de dados
  database: "pizzaria", // Nome do banco de dados a ser utilizado
  port: 3306, // Porta padrão do MySQL
});

// Sincronizando o banco de dados com a definição dos modelos
sequelize
  .sync({ alter: true }) // Sincroniza o banco de dados com os modelos definidos, alterando as tabelas se necessário
  .then(() => {
    console.log("Banco de dados sincronizado com sucesso!"); // Mensagem de sucesso ao sincronizar o banco de dados
  })
  .catch((error: Error) => {
    console.error("Erro ao sincronizar o banco de dados:", error); // Mensagem de erro caso ocorra algum problema durante a sincronização
  });
