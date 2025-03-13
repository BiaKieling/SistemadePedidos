import { useEffect, useState } from "react";
import { Table, Card, Spin, Empty, Layout, Button, Popconfirm } from "antd";
import { api } from "../../services/api";
import styles from "./OrderList.module.scss"; // Importando os estilos
import type { ColumnsType } from "antd/es/table";
import { AxiosError } from "axios"; // Importando o tipo AxiosError
import { useNavigate } from "react-router-dom"; // Importando o useNavigate

const { Content } = Layout;

interface Order {
  id: number;
  cliente: string;
  sabor: string;
  status: string; // Adicionando o status
}

// Definindo um tipo para os dados de erro que esperamos
interface ErrorResponse {
  message: string;
}

export const OrdersList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Corrigido: agora o useNavigate está sendo usado corretamente

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders");
        setOrders(response.data);
      } catch (err) {
        setError("Erro ao carregar os pedidos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await api.delete(`/orders/${id}`);

      // Verificar se o status da resposta é 200 (sucesso)
      if (response.status === 200) {
        setOrders(orders.filter((order) => order.id !== id));
      } else {
        setError("Erro ao remover o pedido. Tente novamente mais tarde.");
      }
    } catch (error) {
      // Especificando o tipo do erro como AxiosError
      const axiosError = error as AxiosError;

      // Verificando se a resposta existe e se o erro tem dados do tipo ErrorResponse
      if (axiosError.response?.data) {
        const errorData = axiosError.response.data as ErrorResponse; // Garantindo que a resposta seja do tipo ErrorResponse
        setError(errorData.message || "Erro desconhecido ao remover o pedido.");
      } else {
        setError("Erro de rede ou erro desconhecido.");
      }

      console.error("Erro ao remover pedido:", axiosError);
    }
  };

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      // Aqui removemos a variável response, pois ela não é necessária
      await api.put(`/orders/${id}/status`, { status });

      // Atualizar o estado local com o novo status
      setOrders(
        orders.map((order) => (order.id === id ? { ...order, status } : order))
      );
    } catch (error) {
      // Especificando o tipo do erro como AxiosError
      const axiosError = error as AxiosError;

      // Verificando se a resposta existe e se o erro tem dados do tipo ErrorResponse
      if (axiosError.response?.data) {
        const errorData = axiosError.response.data as ErrorResponse; // Garantindo que a resposta seja do tipo ErrorResponse
        setError(
          errorData.message || "Erro desconhecido ao atualizar o status."
        );
      } else {
        setError("Erro de rede ou erro desconhecido.");
      }

      console.error("Erro ao atualizar status do pedido:", axiosError);
    }
  };

  const columns: ColumnsType<Order> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "10%",
      align: "center",
    },
    {
      title: "Cliente",
      dataIndex: "cliente",
      key: "cliente",
      width: "40%",
      align: "left",
    },
    {
      title: "Sabor",
      dataIndex: "sabor",
      key: "sabor",
      width: "40%",
      align: "left",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <span>{status}</span>,
    },
    {
      title: "Ações",
      key: "actions",
      render: (_, record: Order) => (
        <>
          <Popconfirm
            title="Tem certeza que deseja excluir?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button
              danger // Usando a propriedade danger diretamente
              style={{ marginRight: 10 }}
            >
              Excluir
            </Button>
          </Popconfirm>
          <Button
            type="primary"
            onClick={() =>
              handleStatusUpdate(
                record.id,
                record.status === "Em preparo" ? "Pronto" : "Em preparo"
              )
            }
          >
            Atualizar Status
          </Button>
        </>
      ),
    },
  ];

  if (loading) {
    return (
      <div className={styles.spinContainer}>
        <Spin size="large" tip="Carregando pedidos..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <Layout className={styles.layout}>
      <div className={styles.background}>
        <Content className={styles.content}>
          <Card className={styles.card} title="Lista de Pedidos">
            <Button
              type="primary"
              onClick={() => navigate("/")} // Agora não dá erro
              className={styles.buttonBack}
            >
              Voltar para a Home
            </Button>
            {orders.length === 0 ? (
              <Empty description="Nenhum pedido encontrado" />
            ) : (
              <Table
                columns={columns}
                dataSource={orders}
                rowKey="id"
                bordered
                pagination={{ pageSize: 5 }}
              />
            )}
          </Card>
        </Content>
      </div>
    </Layout>
  );
};
