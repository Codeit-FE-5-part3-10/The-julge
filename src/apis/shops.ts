import type { GetShopNoticesResponse } from '../types/apis/notice/getShopNotices';
import type { GetShopResponse } from '../types/apis/shop/getShop';
import { axiosInstance } from './axiosInstance';

export const getShop = async (id: string): Promise<GetShopResponse> => {
  const response = await axiosInstance.get(`/shops/${id}`);
  return response.data;
};

export const getShopNotices = async (
  id: string,
  page: number,
  countPerPage: number
): Promise<GetShopNoticesResponse> => {
  const response = await axiosInstance.get(
    `/shops/${id}/notices??offset=${(page - 1) * countPerPage}&limit=${countPerPage}`
  );
  return response.data;
};
