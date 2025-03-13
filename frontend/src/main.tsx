import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./router"; // Importe o componente Router

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router /> {/* Aqui você renderiza as rotas */}
  </React.StrictMode>
);
