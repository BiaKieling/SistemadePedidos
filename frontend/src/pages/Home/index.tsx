import { useState } from "react";
import { Input, Button, Card, Form, Layout } from "antd";
import styles from "./styles.module.scss";
import { api } from "../../services/api";
import { Link } from "react-router-dom"; // Importe o Link

const { Content } = Layout;

export const Home = () => {
  const [cliente, setCliente] = useState("");
  const [sabor, setSabor] = useState("");

  const handleSubmit = async () => {
    try {
      await api.post("/orders", { cliente, sabor });
      alert("Pedido realizado com sucesso!");
      setCliente("");
      setSabor("");
    } catch (error) {
      console.error(error);
      alert("Erro ao realizar o pedido.");
    }
  };

  return (
    <Layout className={styles.background}>
      <Content className={styles.container}>
        <Card className={styles.card} title="Cadastro de Pedido">
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Nome do Cliente" required>
              <Input
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                placeholder="Digite o nome do cliente"
              />
            </Form.Item>
            <Form.Item label="Sabor da Pizza" required>
              <Input
                value={sabor}
                onChange={(e) => setSabor(e.target.value)}
                placeholder="Digite o sabor da pizza"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Cadastrar Pedido
              </Button>
            </Form.Item>
          </Form>
          {/* Link para a página de Lista de Pedidos */}
          <Link to="/orders">
            <Button type="default" block>
              Ver Lista de Pedidos
            </Button>
          </Link>
        </Card>
      </Content>
    </Layout>
  );
};
