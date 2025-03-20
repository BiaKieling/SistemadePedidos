// src/pages/Home/Home.tsx

// Importação de dependências
import { useState } from "react"; // Hook do React para criar estados
import { Input, Button, Card, Form, Layout } from "antd"; // Componentes do Ant Design para UI
import styles from "../Home/Home.module.scss"; // Importando o arquivo de estilos para a página Home
import { api } from "../../services/api"; // Importação da instância de API para interações com o backend
import { Link } from "react-router-dom"; // Importação do Link para navegação entre as páginas do React Router

// Desestruturando o Layout do Ant Design
const { Content } = Layout;

// Componente funcional Home
export const Home = () => {
  // Declarando estados locais para armazenar o nome do cliente e sabor da pizza
  const [cliente, setCliente] = useState(""); // Estado para o nome do cliente
  const [sabor, setSabor] = useState(""); // Estado para o sabor da pizza

  // Função chamada ao submeter o formulário para cadastrar o pedido
  const handleSubmit = async () => {
    try {
      // Fazendo uma requisição POST para o backend para criar o pedido
      await api.post("/orders", { cliente, sabor });
      alert("Pedido realizado com sucesso!"); // Mensagem de sucesso
      setCliente(""); // Limpando o estado do cliente após o pedido
      setSabor(""); // Limpando o estado do sabor após o pedido
    } catch (error) {
      console.error(error); // Log de erro caso a requisição falhe
      alert("Erro ao realizar o pedido."); // Mensagem de erro
    }
  };

  return (
    // Layout do Ant Design com um fundo customizado
    <Layout className={styles.background}>
      <Content className={styles.container}>
        {/* Card com o formulário para cadastro do pedido */}
        <Card className={styles.card} title="Cadastro de Pedido">
          <Form layout="vertical" onFinish={handleSubmit}>
            {/* Formulário para nome do cliente */}
            <Form.Item label="Nome do Cliente" required>
              <Input
                value={cliente}
                onChange={(e) => setCliente(e.target.value)} // Atualizando o estado ao digitar no campo
                placeholder="Digite o nome do cliente"
              />
            </Form.Item>

            {/* Formulário para sabor da pizza */}
            <Form.Item label="Sabor da Pizza" required>
              <Input
                value={sabor}
                onChange={(e) => setSabor(e.target.value)} // Atualizando o estado ao digitar no campo
                placeholder="Digite o sabor da pizza"
              />
            </Form.Item>

            {/* Botão para submeter o formulário */}
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Cadastrar Pedido
              </Button>
            </Form.Item>
          </Form>

          {/* Link para navegar até a página de lista de pedidos */}
          <Link to="/orders">
            <Button type="default" block>
              Ver Lista de Pedidos
            </Button>
          </Link>

          {/* Link para navegar até a página GloboplayUsers */}
          <Link to="/globoplay-users">
            <Button type="default" block style={{ marginTop: "10px" }}>
              Ver Usuários do Globoplay
            </Button>
          </Link>
        </Card>
      </Content>
    </Layout>
  );
};
