import axios from "axios";
import { AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://bootcamp-api.codeit.kr/api/0-1/the-julge",
});
