//O controllers importa as funções que estão no db

import { Request, Response } from "express";
import {
  createOrderDB,
  getOrdersDB,
  getOrderByIdDB,
  deleteOrderDB,
  updateOrderStatusDB,
} from "../database/orders";

// Obter todos os pedidos
export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await getOrdersDB();
    res.send({ success: true, result });
  } catch (error) {
    console.error(error);
    res.send({ success: false, message: "Erro ao obter pedidos" });
  }
};

// Obter um pedido específico por ID
export const getOrderById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const order = await getOrderByIdDB(Number(id));

    if (!order) {
      res.send({ success: false, message: "Pedido não encontrado" });
      return;
    }

    res.send({ success: true, order });
  } catch (error) {
    console.error(error);
    res.send({ success: false, message: "Erro ao obter pedido" });
  }
};

// Criar um novo pedido
export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { cliente, sabor } = req.body;

  if (!cliente || !sabor) {
    res.send({ success: false, message: "Cliente e sabor são obrigatórios" });
    return;
  }

  try {
    const order = await createOrderDB(cliente, sabor);
    res.send({ success: true, order });
  } catch (error) {
    console.error(error);
    res.send({ success: false, message: "Erro ao criar pedido" });
  }
};

// Remover um pedido
export const deleteOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await deleteOrderDB(Number(id));
    res.send({ success: true, result });
  } catch (error) {
    console.error(error);
    res.send({ success: false, message: "Erro ao deletar pedido" });
  }
};

// Atualizar o status de um pedido
export const updateOrderStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    res.send({ success: false, message: "Status é obrigatório" });
    return;
  }

  try {
    const updatedOrder = await updateOrderStatusDB(Number(id), status);
    res.send({ success: true, updated_id: updatedOrder });
  } catch (error) {
    console.error(error);
    res.send({ success: false, message: "Erro ao atualizar status do pedido" });
  }
};
