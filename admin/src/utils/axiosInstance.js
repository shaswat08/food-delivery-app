import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 30000,
  withCredentials: true,
});
