import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"], // ✅ Agora está dentro de um objeto
    queryFn: async () => {
      const response = await api.get("/orders");
      return response.data;
    },
  });
};
