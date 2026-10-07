import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.jxson.tech",
  timeout: 10000,
  headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.API_KEY }
})

apiClient.interceptors.response.use((response) => {
  if (!response.config.headers['x-api-key']) return response
  delete response.config.headers['x-api-key']
  return response
}, (error) => {
  if (!error.config.headers['x-api-key']) throw error;
  delete error.config.headers['x-api-key']
  throw error;
})