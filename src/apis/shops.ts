import { GetShopsNoticesResponse } from '../types/apis/notice/getShopsNotices';
import { GetShopResponse } from '../types/apis/shop/getShops';
import { axiosInstance } from './axiosInstance';

export const getShops = async (id: string): Promise<GetShopResponse> => {
  const response = await axiosInstance.get(`/shops/${id}`);
  return response.data;
};

export const getShopsNotices = async (
  id: string,
  page: number,
  countPerPage: number
): Promise<GetShopsNoticesResponse> => {
  const response = await axiosInstance.get(
    `/shops/${id}/notices??offset=${(page - 1) * countPerPage}&limit=${countPerPage}`
  );
  return response.data;
};
