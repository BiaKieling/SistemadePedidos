import React from 'react';
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
// Corrigir o caminho para importar corretamente o SCSS
import styles from "./styles.module.scss"; // O caminho correto para o arquivo SCSS

interface ButtonBackProps {
  text: string;
  to: string;
}

const ButtonBack: React.FC<ButtonBackProps> = ({ text, to }) => {
  const navigate = useNavigate();

  return (
    <Button
      type="primary"
      onClick={() => navigate(to)}
      className={styles.buttonBack} // Certifique-se de que a classe no SCSS é `buttonBack` (minúsculo)
    >
      {text}
    </Button>
  );
};

export default ButtonBack;
