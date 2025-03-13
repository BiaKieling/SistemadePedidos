// src/types.ts

export interface Order {
  id: number;        // ID único do pedido. Tipo numérico (número inteiro).
  cliente: string;   // Nome do cliente que fez o pedido. Tipo string.
  sabor: string;     // Sabor da pizza escolhida no pedido. Tipo string.
  status: string;    // Status do pedido (ex: "Em preparo", "Pronto"). Tipo string.
}