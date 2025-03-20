// src/services/apiCeleti.ts
import axios from 'axios';

const API_TOKEN = 'qzRRhdYK1zFGZwFAUnm3CLqtpkcokaMXurP1zbhT0JGjgyvvFd';

export const apiCeleti = axios.create({
  baseURL: 'https://dev.rbt.psi.br:5030', // Ou a URL do seu backend
});

apiCeleti.defaults.headers.common['x-access-token'] = API_TOKEN;
