import axios from "axios";
const API_TOKEN = "acessarpizzaria";

// const PROD = "https://dev.rbt.psi.br:3000"
const DEV = "http://localhost:3000";

export const api = axios.create({
  baseURL: DEV,
});

api.defaults.headers.common["x-access-token"] = API_TOKEN;
