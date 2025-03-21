//o routes importa as rotas que estãos no controllers

import { Router } from "express";
import {
  createOrder,
  getOrderById,
  getOrders,
  deleteOrder,
  updateOrderStatus,
} from "../controllers/ordersController";

import { verifyToken } from "../middlewares/verifyToken"; // Importando o middleware

const ordersRoutes = Router();

// Criar um pedido (necessário autenticação)
ordersRoutes.post("/orders", verifyToken, createOrder);

// Listar todos os pedidos (pode exigir autenticação dependendo da sua lógica)
ordersRoutes.get("/orders", verifyToken, getOrders);

// Obter um pedido específico por ID (necessário autenticação)
ordersRoutes.get("/orders/:id", verifyToken, getOrderById);

// Remover um pedido por ID (necessário autenticação)
ordersRoutes.delete("/orders/:id", verifyToken, deleteOrder);
// Atualizar status do pedido (necessário autenticação)
ordersRoutes.put("/orders/:id/status_id", verifyToken, updateOrderStatus); //orders/:id/status  estava

export default ordersRoutes;
