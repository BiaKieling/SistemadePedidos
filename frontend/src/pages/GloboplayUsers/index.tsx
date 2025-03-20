import React, { useEffect, useState } from "react";
import { apiCeleti } from "../../services/apiCeleti"; // Supondo que você tenha configurado o axios
import { User } from "../../types/User"; // Importando o tipo User
import { Table } from "antd"; // Importando o Table do Ant Design
import styles from "./styles.module.scss"; // Importando o arquivo SCSS

const GloboplayUsers = () => {
  // Declarando o estado para armazenar a lista de usuários
  const [users, setUsers] = useState<User[]>([]);

  // Função para buscar os usuários do Globoplay
  const fetchUsers = async () => {
    try {
      // Fazendo a requisição e especificando o tipo da resposta
      const response = await apiCeleti.get<User[]>("/users/globoplay");

      // Atualizando o estado com os usuários recebidos
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  };

  // Chamando a função fetchUsers ao montar o componente
  useEffect(() => {
    fetchUsers();
  }, []);

  // Definindo as colunas da tabela
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
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
  ];

  return (
    <div className={styles.pageContainer}>
      <h1>Usuários Globoplay</h1>
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
