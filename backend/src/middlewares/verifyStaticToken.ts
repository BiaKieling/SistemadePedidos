import { Request, Response, NextFunction } from "express";

export const verifyStaticToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Logando o método e a URL da requisição
  console.log(`Método: ${req.method}, URL: ${req.url}`);

  // Se precisar de mais verificações, pode adicionar aqui
  // Exemplo: Verificando se a requisição tem um corpo
  if (Object.keys(req.body).length === 0) {
    console.log("Corpo da requisição está vazio.");
  }

  // Continuar para a próxima função/middleware ou rota
  next();
};
