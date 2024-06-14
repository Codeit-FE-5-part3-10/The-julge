import axios, { AxiosInstance } from 'axios';
import qs from 'qs';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  paramsSerializer: (parameters) =>
    qs.stringify(parameters, { arrayFormat: 'repeat', encode: false }),
});
