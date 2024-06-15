import type { GetShopResponse } from '../types/apis/shop/getShop';
import { PostShopResponse, postShopRequest } from '../types/apis/shop/postShop';
import { axiosInstance } from './axiosInstance';

export const getShop = async (id: string): Promise<GetShopResponse> => {
  const response = await axiosInstance.get(`/shops/${id}`);
  return response.data;
};

export const postShop = async (
  token: string | null,
  body: postShopRequest
): Promise<PostShopResponse> => {
  const response = await axiosInstance.post('/shops', body, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const putShop = async (
  token: string | null,
  shopId: string,
  body: postShopRequest
): Promise<any> => {
  const response = await axiosInstance.put(`/shops/${shopId}`, body, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
