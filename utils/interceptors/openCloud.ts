import axios from "axios";

export const openCloudClient = axios.create({
  baseURL: "https://apis.roblox.com",
  timeout: 10000,
  headers: { 'Content-Type': 'application/json', "x-api-key": process.env.RBLX_APIKEY }
})

openCloudClient.interceptors.response.use((response) => {
  if (!response.config.headers['x-api-key']) return response
  delete response.config.headers['x-api-key']
  return response
}, (error) => {
  if (!error.config.headers['x-api-key']) throw error;
  delete error.config.headers['x-api-key']
  throw error;
})