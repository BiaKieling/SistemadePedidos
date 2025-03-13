// src/pages/OrdersPage/OrderList.tsx

// Importação de componentes e hooks necessários da Ant Design, outros componentes internos e hooks personalizados.
import { Layout, Card, Spin, Empty } from "antd"; // Componentes do Ant Design para layout, cartão, carregamento e estado vazio
import { ButtonBack } from "../../components/ButtonBack/ButtonBack"; // Componente para o botão de voltar
import OrderTable from "../../components/OrderTable"; // Tabela para exibir os pedidos
import useOrders from "../../hooks/useOrders"; // Hook customizado para buscar os pedidos
import styles from "./OrderList.module.scss"; // Estilos específicos para a página

// Desestruturando o Layout para pegar o conteúdo
const { Content } = Layout;

export const OrdersList = () => {
  // Usando o hook customizado 'useOrders' para buscar os pedidos e controlar estado de carregamento e erro
  const { orders, setOrders, loading, error } = useOrders();

  // Verificação se os dados estão sendo carregados
  if (loading) {
    return (
      <div className={styles.spinContainer}>
        {/* Exibindo um indicador de carregamento enquanto os pedidos estão sendo carregados */}
        <Spin size="large" tip="Carregando pedidos..." />
      </div>
    );
  }

  // Se houver algum erro ao buscar os pedidos, exibe a mensagem de erro
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p> {/* Mostra o erro retornado */}
      </div>
    );
  }

  return (
    // Layout geral da página
    <Layout className={styles.layout}>
      <div className={styles.background}>
        {" "}
        {/* Adiciona fundo à página */}
        <Content className={styles.content}>
          {" "}
          {/* Define o conteúdo da página */}
          <Card className={styles.card} title="Lista de Pedidos">
            {" "}
            {/* Título e estilo do card */}
            <ButtonBack />{" "}
            {/* Componente de botão para voltar à página anterior */}
            {/* Condição para exibir a tabela de pedidos ou a mensagem de "nenhum pedido encontrado" */}
            {orders.length === 0 ? (
              <Empty description="Nenhum pedido encontrado" /> /* Se não houver pedidos */
            ) : (
              // Exibindo a tabela de pedidos com a lista atualizada
              <OrderTable orders={orders} setOrders={setOrders} />
            )}
          </Card>
        </Content>
      </div>
    </Layout>
  );
};
