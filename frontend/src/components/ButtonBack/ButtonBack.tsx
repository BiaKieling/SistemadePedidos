// Importando o componente Button do Ant Design para criar o botão
import { Button } from "antd";

// Importando o hook useNavigate do react-router-dom para permitir navegação entre páginas
import { useNavigate } from "react-router-dom";

// Importando o arquivo de estilo do componente ButtonBack
import styles from "./ButtonBack.module.scss";

// Componente funcional ButtonBack
export const ButtonBack = () => {
  // Hook useNavigate é usado para obter a função de navegação
  const navigate = useNavigate();

  return (
    // Componente Button do Ant Design
    <Button
      type="primary" // Define o estilo do botão como "primary" (botão com destaque)
      onClick={() => navigate("/")} // Quando o botão for clicado, navega para a página inicial ("/")
      className={styles.buttonBack} // Aplica o estilo do arquivo ButtonBack.module.scss
    >
      Voltar para a Home {/* Texto do botão */}
    </Button>
  );
};
