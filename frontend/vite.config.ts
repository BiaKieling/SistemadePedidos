import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/orders": "http://localhost:3000", // Proxy para a rota do backend
    },
  },
});
