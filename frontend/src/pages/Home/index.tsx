import { useState } from "react";
import Input from "antd/es/input";
import Button from "antd/es/button";
import Form from "antd/es/form";
import Card from "antd/es/card";
import Layout from "antd/es/layout";
import styles from "./styles.module.scss";
import { api } from "../../services/api";
import { Link } from "react-router-dom";

const { Content } = Layout;

export const Home = () => {
  const [cliente, setCliente] = useState("");
  const [sabor, setSabor] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.post("/orders", { cliente, sabor });
      alert("Pedido realizado com sucesso!");
      setCliente("");
      setSabor("");
    } catch {
      alert("Erro ao realizar o pedido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className={styles.background}>
      <Content style={{ padding: "20px" }}>
        <Card>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Nome do Cliente"
              name="cliente"
              rules={[{ required: true, message: "Digite o nome do cliente" }]}
            >
              <Input
                value={cliente}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCliente(e.target.value)
                }
              />
            </Form.Item>

            <Form.Item
              label="Sabor da Pizza"
              name="sabor"
              rules={[{ required: true, message: "Digite o sabor da pizza" }]}
            >
              <Input
                value={sabor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSabor(e.target.value)
                }
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Cadastrar Pedido
              </Button>
            </Form.Item>
          </Form>

          <Link to="/orders">
            <Button type="default" block>
              Ver Lista de Pedidos
            </Button>
          </Link>

          <Link to="/globoplay-users">
            <Button type="default" block style={{ marginTop: 10 }}>
              Ver Usuários do Globoplay
            </Button>
          </Link>
        </Card>
      </Content>
    </Layout>
  );
};
