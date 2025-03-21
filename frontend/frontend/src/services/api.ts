import axios from "axios";

// const PROD = "https://dev.rbt.psi.br:3000"
const DEV = "http://localhost:3000"

export const api = axios.create({
    baseURL: DEV,
});
