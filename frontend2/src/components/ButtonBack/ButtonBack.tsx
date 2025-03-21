// Importando o componente Button do Ant Design para criar o botão
import { Button } from "antd";

// Importando o hook useNavigate do react-router-dom para permitir navegação entre páginas
import { useNavigate } from "react-router-dom";

// Importando o arquivo de estilo do componente ButtonBack
import styles from "./ButtonBack.module.scss";

// Componente funcional ButtonBack
interface ButtonBackProps {
  text: string; // Propriedade para o texto do botão
  to: string;   // Rota para onde o botão vai levar
}

export const ButtonBack: React.FC<ButtonBackProps> = ({ text, to }) => {
  // Hook useNavigate é usado para obter a função de navegação
  const navigate = useNavigate();

  return (
    // Componente Button do Ant Design
    <Button
      type="primary" // Define o estilo do botão como "primary" (botão com destaque)
      onClick={() => navigate(to)} // Quando o botão for clicado, navega para a rota passada como prop
      className={styles.buttonBack} // Aplica o estilo do arquivo ButtonBack.module.scss
    >
      {text} {/* Texto do botão */}
    </Button>
  );
};
