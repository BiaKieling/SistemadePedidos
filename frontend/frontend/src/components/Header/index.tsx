import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

export const Header = ({ title, showBackButton }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      {showBackButton && (
        <Button type="default" onClick={() => navigate("/")}>
          Voltar
        </Button>
      )}
      <h1>{title}</h1>
    </div>
  );
};
