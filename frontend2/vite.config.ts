import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/orders": "http://localhost:3000", // Proxy para a rota do backend
    },
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly", // Conversão para camelCase nas classes
    },
    preprocessorOptions: {
      scss: {
        additionalData: "", // Deixe vazio ou remova esta linha
      },
    },
  },
});
