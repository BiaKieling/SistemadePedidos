// Importa os tipos necessários do Express para tipar os parâmetros da função middleware
import { Request, Response, NextFunction } from "express";

// Middleware que verifica a presença de um token estático e também registra informações sobre a requisição
export const verifyStaticToken = (
  req: Request, // A requisição recebida
  res: Response, // A resposta que será enviada de volta ao cliente
  next: NextFunction // Função para continuar para o próximo middleware ou a função de rota
) => {
  // Logando o método HTTP (GET, POST, PUT, DELETE, etc.) e a URL da requisição
  console.log(`Método: ${req.method}, URL: ${req.url}`);

  // Verifica se o corpo da requisição está vazio (se o número de chaves no objeto do corpo for zero)
  if (Object.keys(req.body).length === 0) {
    console.log("Corpo da requisição está vazio.");
  }

  // Chama a função 'next()', que permite que a requisição siga para o próximo middleware ou rota
  next();
};
