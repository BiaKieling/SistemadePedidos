//o routes importa as rotas que estãos no controllers

import { Router } from "express";
import {
  createOrder,
  getOrderById,
  getOrders,
  deleteOrder,
  updateOrderStatus,
} from "../controllers/ordersController";

import { verifyStaticToken } from "../middlewares/verifyStaticToken";  // Importando o middleware
//import { getOrders } from "../database/orders";
//import { getOrderById, ordersController } from "../controllers/ordersController";

const ordersRoutes = Router();

// Criar um pedido (necessário autenticação)
ordersRoutes.post("/", verifyStaticToken, createOrder);  

// Listar todos os pedidos (pode exigir autenticação dependendo da sua lógica)
ordersRoutes.get("/", verifyStaticToken, getOrders);  

// Obter um pedido específico por ID (necessário autenticação)
ordersRoutes.get("/:id", verifyStaticToken, getOrderById);  

// Remover um pedido por ID (necessário autenticação)
ordersRoutes.delete("/:id", verifyStaticToken, deleteOrder);  
// Atualizar status do pedido (necessário autenticação)
ordersRoutes.put("/:id", verifyStaticToken, updateOrderStatus);  

export default ordersRoutes;
