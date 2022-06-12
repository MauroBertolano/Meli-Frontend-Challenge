import axios from "axios";

const ApiService = axios.create({
  baseURL: process.env.API_URL,
});

export default ApiService;
