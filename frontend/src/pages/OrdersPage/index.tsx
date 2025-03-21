import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Table, Button, Popconfirm } from "antd";
import ButtonBack from "../../components/Button";
import { Order } from "../../types/Order";
import styles from "./../OrdersPage/styles.module.scss";
import { api } from "../../services/api";
import { DeleteOutlined } from "@ant-design/icons"; // Importando ícone de exclusão

// Função para buscar os pedidos
async function getOrders() {
  const response = await api.get("/orders");
  return response.data; // Garantir que seja sempre um array
}

const OrderList = () => {
  const queryClient = useQueryClient();
  // Utilizando useQuery para buscar os pedidos
  const {
    data: pedidos, // estava: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  console.log("Pedidos recebidos da API:", pedidos); // Estava: orders)

  // Função para lidar com a mudança de status
  const handleStatusChange = async (id: number, status: string) => {
    const statusId = status === "Pronto" ? 2 : 1; // Definindo o status_id como número
    await api.put(`orders/${id}/status_id`, { status_id: statusId });
    queryClient.invalidateQueries({ queryKey: ["orders"] });
  };

  // Função para deletar pedido
  const handleDelete = async (id: number) => {
    await api.delete(`orders/${id}`);
    queryClient.invalidateQueries({ queryKey: ["orders"] }); // Atualiza a lista de pedidos após exclusão
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
      title: "Status ID",
      dataIndex: "status_id",
      key: "status_id",
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: unknown, record: Order) => (
        <div>
          <Button
            onClick={() => handleStatusChange(record.id, "Pronto")}
            type="primary"
            disabled={record.status_id === 2} // Comparando com 2 para "Pronto"
          >
            Marcar como Pronto
          </Button>
          <div style={{ marginTop: 8 }}>
            <Popconfirm
              title="Tem certeza que deseja deletar este pedido?"
              onConfirm={() => handleDelete(record.id)} // Função de deletar
              okText="Sim"
              cancelText="Não"
            >
              <Button
                type="default"
                icon={<DeleteOutlined />}
                className={styles["delete-button"]} // Adiciona a classe para estilizar o botão de deletar
              >
                Deletar
              </Button>
            </Popconfirm>
          </div>
        </div>
      ),
    },
  ];

  if (isLoading) return <p>Carregando...</p>;
  if (error instanceof Error)
    return <p>Erro ao carregar pedidos: {error.message}</p>;

  return (
    <div className={styles.background}>
      <h1>Lista de Pedidos</h1>
      <ButtonBack text="Voltar para a Home" to="/" />
      <Table
        dataSource={pedidos.orders} // estava: {orders.orders}
        columns={columns}
        rowKey={(record) => record.id}
        className={styles.table}
        scroll={{ x: 300 }} // Adicionando rolagem horizontal
      />
    </div>
  );
};

export default OrderList;
