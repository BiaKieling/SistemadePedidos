import { Request, Response, NextFunction } from "express";

// Token esperado
const TOKEN = "acessarpizzaria";

// Middleware para verificar o token
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Verifica se o token fornecido no cabeçalho 'x-access-token' é igual ao esperado
  if (req.headers["x-access-token"] !== TOKEN) {
    // Se o token não for válido, retorna erro 401 (não autorizado) e interrompe o fluxo
    res
      .status(401)
      .send({ success: false, message: "Token inválido ou ausente" });
    return; // Garantir que o fluxo seja interrompido
  }

  // Se o token for válido, prossegue para a próxima função ou rota
  next();
};
