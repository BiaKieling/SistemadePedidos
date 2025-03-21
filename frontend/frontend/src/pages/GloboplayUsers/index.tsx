import React, { useEffect, useState } from "react";
import { apiCeleti } from "../../services/apiCeleti"; // Supondo que você tenha configurado o axios
import { User } from "../../types/User"; // Importando o tipo User
import { Table, Button } from "antd"; // Importando o Table do Ant Design
import { useNavigate } from "react-router-dom"; // Importando useNavigate do React Router
//import { ButtonBack } from "../../components/ButtonBack/ButtonBack"; // Importando o componente ButtonBack
import styles from "./styles.module.scss"; // Importando o arquivo SCSS

const GloboplayUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await apiCeleti.get<User[]>("/users/globoplay");
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "Document",
      dataIndex: "document",
      key: "document",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  const handleGoHome = () => {
    navigate("/"); // Navegar para a página inicial
  };

  return (
    <div className={styles.pageContainer}>
      <h1>Usuários Globoplay</h1>

      {/* Botão para ir à Home */}
      <div className={styles.buttonContainer}>
        <Button onClick={handleGoHome}>Ir para Home</Button>
      </div>

      {users.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        <Table
          dataSource={users} // Passando os dados dos usuários
          columns={columns} // Definindo as colunas
          rowKey="document" // A chave única para cada linha, usamos o document
        />
      )}
    </div>
  );
};

export default GloboplayUsers;
