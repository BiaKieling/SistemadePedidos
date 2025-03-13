import { Request, Response } from "express";
import { Order } from "../models/orderModel"; // Modelo de pedidos

export const ordersController = {
  createOrder: async (req: Request, res: Response): Promise<void> => {
    const { cliente, sabor } = req.body; // Remover quantity

    try {
      const newOrder = await Order.create({ cliente, sabor });
      res.status(201).json(newOrder);
    } catch (error: any) {
      res.status(500).json({ message: "Erro ao criar pedido", error: error.message });
    }
  },

  getOrders: async (req: Request, res: Response): Promise<void> => {
    try {
      const orders = await Order.findAll();
      res.status(200).json(orders);
    } catch (error: any) {
      res.status(500).json({ message: "Erro ao obter pedidos", error: error.message });
    }
  },

  getOrderById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const order = await Order.findByPk(id);
      if (!order) {
        res.status(404).json({ message: "Pedido não encontrado" });
        return;
      }
      res.status(200).json(order);
    } catch (error: any) {
      res.status(500).json({ message: "Erro ao obter pedido", error: error.message });
    }
  },

  // Função para deletar pedido
  deleteOrder: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const order = await Order.findByPk(id);
      if (!order) {
        res.status(404).json({ message: "Pedido não encontrado" });
        return;
      }
      await order.destroy(); // Deleta o pedido
      res.status(200).json({ message: "Pedido removido com sucesso" });
    } catch (error: any) {
      res.status(500).json({ message: "Erro ao remover pedido", error: error.message });
    }
  },

  // Função para atualizar status do pedido
  updateOrderStatus: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { status } = req.body; // Recebe o novo status

    try {
      const order = await Order.findByPk(id);
      if (!order) {
        res.status(404).json({ message: "Pedido não encontrado" });
        return;
      }

      // Atualiza o status do pedido
      order.status = status;
      await order.save(); // Salva as alterações

      res.status(200).json(order); // Retorna o pedido atualizado
    } catch (error: any) {
      res.status(500).json({ message: "Erro ao atualizar status do pedido", error: error.message });
    }
  },
};


/*
// src/controllers/ordersController.ts
import { Request, Response } from "express";
import { Order } from "../models/orderModel";

export const ordersController = {
  createOrder: async (req: Request, res: Response): Promise<void> => {
    const { cliente, sabor } = req.body; // Remover quantity

    try {
      const newOrder = await Order.create({ cliente, sabor });

      res.status(201).json(newOrder);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Erro ao criar pedido", error: error.message });
    }
  },

  getOrders: async (req: Request, res: Response): Promise<void> => {
    try {
      const orders = await Order.findAll();
      res.status(200).json(orders);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Erro ao obter pedidos", error: error.message });
    }
  },

  getOrderById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const order = await Order.findByPk(id);
      if (!order) {
        res.status(404).json({ message: "Pedido não encontrado" });
        return;
      }
      res.status(200).json(order);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Erro ao obter pedido", error: error.message });
    }
  },
};*/
