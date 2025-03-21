//Confguração da conexão com o db
import mysql from "mysql2";

//server do banco pizzaria
const database = {
  host: "localhost",
  user: "root",
  password: "Bianca123@", //senha do banco
  database: "pizzaria", //nome do banco de dados
};

const connect = async () => {
  //@ts-ignore
  if (global.connection && global.connection.state !== "disconnected")
    //@ts-ignore
    return global.connection;
  //@ts-ignore
  const connection = mysql.createPool(database);
  console.log(`Connection sucessfully on DB ${database.database}`);
  //@ts-ignore
  global.connection = connection.promise();
  return connection;
};

connect();

export default connect;
