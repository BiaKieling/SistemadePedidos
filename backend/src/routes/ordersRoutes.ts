import { Router } from "express";
import { ordersController } from "../controllers/ordersController"; // Usando a exportação correta
import { verifyStaticToken } from "../middlewares/verifyStaticToken"; // Usando a exportação correta

const ordersRoutes = Router();

// Rota para criar um pedido
ordersRoutes.post("/", verifyStaticToken, ordersController.createOrder);

// Rota para obter todos os pedidos
ordersRoutes.get("/", verifyStaticToken, ordersController.getOrders);

// Rota para obter um pedido específico
ordersRoutes.get("/:id", verifyStaticToken, ordersController.getOrderById);

// Rota para remover um pedido
ordersRoutes.delete("/:id", verifyStaticToken, ordersController.deleteOrder);

// Rota para atualizar o status de um pedido
ordersRoutes.put("/:id/status", verifyStaticToken, ordersController.updateOrderStatus);

export { ordersRoutes };


/*
// src/routes/ordersRoutes.ts
import { Router } from "express";
import { ordersController } from "../controllers/ordersController"; // Usando a exportação correta
import { verifyStaticToken } from "../middlewares/verifyStaticToken"; // Usando a exportação correta

const ordersRoutes = Router();

ordersRoutes.post("/", verifyStaticToken, ordersController.createOrder);
ordersRoutes.get("/", verifyStaticToken, ordersController.getOrders);
ordersRoutes.get("/:id", verifyStaticToken, ordersController.getOrderById);

export { ordersRoutes };*/
