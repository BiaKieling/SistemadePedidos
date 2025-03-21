import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchGloboplayUsers = async () => {
  const { data } = await axios.get("https://api.celetihub.com.br/api");
  return data;
};

export const useGloboplayUsers = () => {
  return useQuery({
    queryKey: ["globoplayUsers"],
    queryFn: fetchGloboplayUsers,
  });
};


// import axios from 'axios';

// const TOKEN = `3cb51180a254bc0c513d3ca52fca74f173471c8669def5ee7f3961f60b429c24407285718450440e9148968c5a831dd4dd8d0236d07f40101a5c4e6ddd237a07`

// //DEV BASE URL
// // const BASEURL = `https://api.homologacao.celetihub.com.br/api`
// //PROD BASE URL
// const BASEURL = `https://api.celetihub.com.br/api`

// var current_token: any;
// var current_token_expires: any;

// const getToken = async () => {
//     if (current_token && current_token_expires > Date.now())
//         return current_token;

//     const { data } = await axios.post(`${BASEURL}/authenticate`, { "access_token": TOKEN })
//     current_token = data.authorization.token;
//     current_token_expires = Date.now() + data.authorization.expires_in * 1000;
//     return data.authorization.token;
// }

// export const celetiAPI = axios.create({
//     baseURL: BASEURL
// });

// celetiAPI.interceptors.request.use(
//     async config => {
//         //@ts-ignore
//         config.headers = {
//             'Authorization': 'bearer ' + await getToken(),
//         }
//         return config;
//     },
//     error => Promise.reject(error)
// );