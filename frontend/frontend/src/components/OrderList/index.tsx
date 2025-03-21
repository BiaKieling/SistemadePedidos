import { List } from "antd";
import { useOrders } from "../../hooks/useOrders";
import styles from "./styles.module.scss";

export const OrderList = () => {
  const { data: orders, isLoading } = useOrders();

  return (
    <div className={styles.container}>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <List
          bordered
          dataSource={orders}
          renderItem={(order) => (
            <List.Item>{`${order.cliente} - ${order.sabor}`}</List.Item>
          )}
        />
      )}
    </div>
  );
};
