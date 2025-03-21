//Conexão das funções e tabelas do banco de dados

import connect from "./config/_configDB";

// Criar um pedido(Método POST)
export const createOrderDB = async (cliente: string, sabor: string) => {
  const conn = await connect();
  const sql = "INSERT INTO orders (cliente, sabor, status_id) VALUES (?, ?, 1)";
  const values = [cliente, sabor];
  let [resul] = await conn.query(sql, values);
  return resul;
};

// Listar todos os pedidos
export const getOrdersDB = async () => {
  const conn = await connect();
  const sql = "SELECT * FROM orders";
  //const values = [];
  let [resul] = await conn.query(sql);
  return resul;
};

// Obter um pedido específico por ID
export const getOrderByIdDB = async (id: number) => {
  const conn = await connect();
  const sql = "SELECT * FROM orders WHERE id = ?";
  const values = [id];
  let [resul] = await conn.query(sql, values);
  return resul;
};

// Remover um pedido por ID
export const deleteOrderDB = async (id: number) => {
  const conn = await connect();
  const sql = "DELETE FROM orders WHERE id = ?";
  const values = [id];
  const [result] = await conn.query(sql, values);
  return result;
};

// Atualizar o status de um pedido
export const updateOrderStatusDB = async (id: number, status_id:number) => {
  const conn = await connect();
  const sql = "UPDATE orders SET status_id = ? WHERE id = ?";
  const values = [status_id, id];
  const [result] = await conn.query(sql, values);
  return result;
};
