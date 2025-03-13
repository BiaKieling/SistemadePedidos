// Importando os componentes necessários do Ant Design
import { Table, Button, Popconfirm } from "antd";

// Importando o tipo ColumnsType do Ant Design para tipar as colunas da tabela
import { ColumnsType } from "antd/es/table";

// Importando o tipo Order para usar no estado dos pedidos
import { Order } from "../types/types";

// Importando a instância da API para fazer as requisições
import { api } from "../services/api";

// Definindo as propriedades esperadas pelo componente
interface Props {
  orders: Order[]; // Lista de pedidos
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>; // Função para atualizar o estado dos pedidos
}

// Componente funcional OrderTable
const OrderTable: React.FC<Props> = ({ orders, setOrders }) => {
  
  // Função para excluir um pedido
  const handleDelete = async (id: number) => {
    try {
      // Realiza a requisição DELETE para excluir o pedido
      const response = await api.delete(`/orders/${id}`);
      if (response.status === 200) {
        // Se a resposta for bem-sucedida, atualiza a lista de pedidos
        setOrders(orders.filter((order) => order.id !== id));
      }
    } catch (error) {
      console.error(error); // Em caso de erro, imprime o erro no console
    }
  };

  // Função para atualizar o status de um pedido
  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      // Realiza a requisição PUT para atualizar o status do pedido
      await api.put(`/orders/${id}/status`, { status });
      // Atualiza a lista de pedidos com o novo status
      setOrders(
        orders.map((order) => (order.id === id ? { ...order, status } : order))
      );
    } catch (error) {
      console.error(error); // Em caso de erro, imprime o erro no console
    }
  };

  // Definindo as colunas da tabela
  const columns: ColumnsType<Order> = [
    {
      title: "ID", // Título da coluna
      dataIndex: "id", // Campo da coluna que será exibido
      key: "id", // Chave única para identificar a coluna
    },
    {
      title: "Cliente", // Título da coluna
      dataIndex: "cliente", // Campo da coluna que será exibido
      key: "cliente", // Chave única para identificar a coluna
    },
    {
      title: "Sabor", // Título da coluna
      dataIndex: "sabor", // Campo da coluna que será exibido
      key: "sabor", // Chave única para identificar a coluna
    },
    {
      title: "Status", // Título da coluna
      dataIndex: "status", // Campo da coluna que será exibido
      key: "status", // Chave única para identificar a coluna
    },
    {
      title: "Ações", // Título da coluna de ações
      key: "actions", // Chave única para identificar a coluna de ações
      render: (_, record: Order) => (
        <>
          {/* Popconfirm para confirmar a exclusão */}
          <Popconfirm
            title="Tem certeza que deseja excluir?" // Pergunta de confirmação
            onConfirm={() => handleDelete(record.id)} // Ao confirmar, chama a função de excluir
          >
            <Button danger style={{ marginRight: 10 }}>
              Excluir
            </Button>
          </Popconfirm>
          {/* Botão para atualizar o status do pedido */}
          <Button
            type="primary"
            onClick={() =>
              handleStatusUpdate(
                record.id, // ID do pedido
                record.status === "Em preparo" ? "Pronto" : "Em preparo" // Alterna entre os status "Em preparo" e "Pronto"
              )
            }
          >
            Atualizar Status
          </Button>
        </>
      ),
    },
  ];

  return (
    // Componente Table do Ant Design que exibe a lista de pedidos
    <Table
      columns={columns} // Passa as colunas definidas
      dataSource={orders} // Passa os dados (pedidos)
      rowKey="id" // Define que a chave única de cada linha será o campo "id"
      bordered // Aplica borda na tabela
      pagination={{ pageSize: 5 }} // Define a quantidade de itens por página
    />
  );
};

// Exporta o componente para ser usado em outras partes do aplicativo
export default OrderTable;
