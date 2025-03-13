// Importando os hooks useState e useEffect do React
import { useState, useEffect } from "react";

// Importando a instância da API para fazer as requisições
import { api } from "../services/api";

// Importando o tipo Order para garantir que os dados dos pedidos sejam tipados corretamente
import { Order } from "../types/types";

// Custom Hook que gerencia o estado dos pedidos
const useOrders = () => {
  // Estado que armazena a lista de pedidos
  const [orders, setOrders] = useState<Order[]>([]);

  // Estado que armazena o status de carregamento
  const [loading, setLoading] = useState<boolean>(true);

  // Estado que armazena mensagens de erro
  const [error, setError] = useState<string | null>(null);

  // O hook useEffect é utilizado para realizar a requisição de dados assim que o componente for montado
  useEffect(() => {
    // Função assíncrona que faz a requisição à API para buscar os pedidos
    const fetchOrders = async () => {
      try {
        // Fazendo a requisição GET à API para obter a lista de pedidos
        const response = await api.get("/orders");
        // Atualizando o estado dos pedidos com os dados recebidos
        setOrders(response.data);
      } catch (err) {
        // Caso ocorra algum erro, atualiza o estado de erro com a mensagem
        setError("Erro ao carregar os pedidos.");
        // Imprime o erro no console para facilitar a depuração
        console.error(err);
      } finally {
        // Quando a requisição for finalizada (com sucesso ou erro), atualiza o estado de loading
        setLoading(false);
      }
    };

    // Chama a função fetchOrders para buscar os dados quando o componente for montado
    fetchOrders();
  }, []); // O array vazio [] garante que a requisição seja feita apenas uma vez, na montagem do componente

  // Retorna os dados que o hook fornece para serem utilizados no componente
  return { orders, setOrders, loading, error };
};

// Exporta o custom hook para ser usado em outros componentes
export default useOrders;
