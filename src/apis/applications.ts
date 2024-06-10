import { GetShopNoticeApplicationsResponse } from '../types/apis/application/getShopNoticeApplications';
import { axiosInstance } from './axiosInstance';

export const getShopNoticeApplications = async (
  shopId: string,
  noticeId: string,
  page: number,
  countPerPage: number
): Promise<GetShopNoticeApplicationsResponse> => {
  const response = await axiosInstance.get(
    `/shops/${shopId}/notices/${noticeId}/applications?offset=${(page - 1) * countPerPage}&limit=${countPerPage}`
  );
  return response.data;
};
