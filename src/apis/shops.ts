import type { GetShopResponse } from '../types/apis/shop/getShop';
import { axiosInstance } from './axiosInstance';

export const getShop = async (id: string): Promise<GetShopResponse> => {
  const response = await axiosInstance.get(`/shops/${id}`);
  return response.data;
};
