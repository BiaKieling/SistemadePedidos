import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Table, Button } from "antd";
import { ButtonBack } from "../../components/ButtonBack/ButtonBack";
import { Order } from "../../types/Order";
import styles from "./OrderList.module.scss";
import { api } from "../../services/api";

const OrderList = () => {
  const queryClient = useQueryClient();

  // Utilizando useQuery para buscar os pedidos
  const [orders, setOrders] = useState<any>([]);

  const { isPending, error } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  async function getOrders() {
    const response = await api.get("/orders");
    setOrders(response.data);
    return response.data;
  }

  // Função para lidar com a mudança de status
  const handleStatusChange = async (id: number, status: string) => {
    const response = await api.put(`orders/${id}/status`, { status });
    queryClient.invalidateQueries({ queryKey: ["orders"] });
  };

  const columns = [
    {
      title: "Pedido ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Cliente",
      dataIndex: "cliente",
      key: "cliente",
    },
    {
      title: "Sabor",
      dataIndex: "sabor",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: unknown, record: Order) => (
        <div>
          {/* Botão para atualizar o status */}
          <Button
            onClick={() => handleStatusChange(record.id, "Pronto")} // Passando o status do pedido
            type="primary"
            disabled={record.status === "Pronto"} // Desabilita o botão se o status já for "Pronto"
          >
            Marcar como Pronto
          </Button>
        </div>
      ),
    },
  ];

  if (isPending) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar pedidos</p>;

  return (
    <div className={styles.background}>
      <h1>Lista de Pedidos</h1>
      <ButtonBack text="Voltar para a Home" to="/" />
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="id"
        className={styles.table}
      />
    </div>
  );
};

export default OrderList;
