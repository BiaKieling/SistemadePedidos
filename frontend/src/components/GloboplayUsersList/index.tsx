import { List, Spin } from "antd";
import { useGloboplayUsers } from "../../hooks/useGloboplayUsers";
import styles from "./styles.module.scss";

export const GloboplayUserList = () => {
  const { data: users, isLoading, error } = useGloboplayUsers();

  if (isLoading) return <Spin size="large" />;
  if (error) return <p>Erro ao carregar usuários.</p>;

  return (
    <div className={styles.container}>
      <List
        bordered
        dataSource={users}
        renderItem={(user) => (
          <List.Item>{`${user.nome} - ${user.email}`}</List.Item>
        )}
      />
    </div>
  );
};
