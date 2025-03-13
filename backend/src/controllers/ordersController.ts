// Importa os tipos Request e Response do Express para definir o tipo das variáveis em cada função
import { Request, Response } from "express"; 
// Importa o modelo Order que representa os pedidos no banco de dados
import { Order } from "../models/orderModel"; 

// Controlador que contém as funções relacionadas ao gerenciamento dos pedidos
export const ordersController = {

  // Função para criar um novo pedido
  createOrder: async (req: Request, res: Response): Promise<void> => {
    // Desestrutura o corpo da requisição para obter os dados do cliente e do sabor do pedido
    const { cliente, sabor } = req.body; 

    try {
      // Tenta criar um novo pedido no banco de dados com os dados recebidos
      const newOrder = await Order.create({ cliente, sabor });
      // Se a criação for bem-sucedida, retorna o novo pedido com status 201 (criado)
      res.status(201).json(newOrder);
    } catch (error: any) {
      // Caso ocorra um erro, retorna um erro 500 (erro no servidor) com uma mensagem
      res.status(500).json({ message: "Erro ao criar pedido", error: error.message });
    }
  },

  // Função para obter todos os pedidos
  getOrders: async (req: Request, res: Response): Promise<void> => {
    try {
      // Busca todos os pedidos no banco de dados
      const orders = await Order.findAll();
      // Retorna os pedidos encontrados com status 200 (OK)
      res.status(200).json(orders);
    } catch (error: any) {
      // Se houver um erro ao buscar os pedidos, retorna um erro 500
      res.status(500).json({ message: "Erro ao obter pedidos", error: error.message });
    }
  },

  // Função para obter um pedido específico pelo ID
  getOrderById: async (req: Request, res: Response): Promise<void> => {
    // Extrai o id do pedido a partir dos parâmetros da URL
    const { id } = req.params;

    try {
      // Busca o pedido pelo ID no banco de dados
      const order = await Order.findByPk(id);
      // Se o pedido não for encontrado, retorna um erro 404 (não encontrado)
      if (!order) {
        res.status(404).json({ message: "Pedido não encontrado" });
        return;
      }
      // Se o pedido for encontrado, retorna o pedido com status 200 (OK)
      res.status(200).json(order);
    } catch (error: any) {
      // Caso ocorra um erro ao buscar o pedido, retorna um erro 500
      res.status(500).json({ message: "Erro ao obter pedido", error: error.message });
    }
  },

  // Função para deletar um pedido
  deleteOrder: async (req: Request, res: Response): Promise<void> => {
    // Extrai o id do pedido a partir dos parâmetros da URL
    const { id } = req.params;

    try {
      // Tenta encontrar o pedido no banco de dados
      const order = await Order.findByPk(id);
      // Se o pedido não for encontrado, retorna um erro 404
      if (!order) {
        res.status(404).json({ message: "Pedido não encontrado" });
        return;
      }
      // Se o pedido for encontrado, deleta o pedido
      await order.destroy();
      // Retorna uma mensagem de sucesso com status 200 (OK)
      res.status(200).json({ message: "Pedido removido com sucesso" });
    } catch (error: any) {
      // Caso ocorra um erro ao deletar o pedido, retorna um erro 500
      res.status(500).json({ message: "Erro ao remover pedido", error: error.message });
    }
  },

  // Função para atualizar o status de um pedido
  updateOrderStatus: async (req: Request, res: Response): Promise<void> => {
    // Extrai o id do pedido e o novo status a partir da URL e do corpo da requisição
    const { id } = req.params;
    const { status } = req.body;

    try {
      // Tenta encontrar o pedido no banco de dados pelo ID
      const order = await Order.findByPk(id);
      // Se o pedido não for encontrado, retorna um erro 404
      if (!order) {
        res.status(404).json({ message: "Pedido não encontrado" });
        return;
      }

      // Atualiza o status do pedido com o novo status recebido
      order.status = status;
      // Salva as alterações feitas no pedido no banco de dados
      await order.save();

      // Retorna o pedido atualizado com status 200 (OK)
      res.status(200).json(order);
    } catch (error: any) {
      // Caso ocorra um erro ao atualizar o status, retorna um erro 500
      res.status(500).json({ message: "Erro ao atualizar status do pedido", error: error.message });
    }
  },
};
