import exp from 'constants';
import type { GetShopsSingleNoticeResponse } from '../types/apis/notice/getShopSingleNotice';
import {
  GetNoticesRequest,
  GetNoticesResponse,
  PostNoticeRequest,
  PostNoticeResponse,
} from '../types/apis/noticeTypes';
import { axiosInstance } from './axiosInstance';

export const getNotices = async (query: GetNoticesRequest): Promise<GetNoticesResponse> => {
  const { offset, limit } = query;
  const response = await axiosInstance.get(`/notices?offset=${offset}&limit=${limit}`);

  return response.data;
};

export const postNotice = async (request: PostNoticeRequest): Promise<PostNoticeResponse> => {
  const response = await axiosInstance.post(`shops/${request.shopId}/notices`, request);
  return response.data;
};

export const getShopSingleNotice = async (
  shopId: string,
  noticeId: string
): Promise<GetShopsSingleNoticeResponse> => {
  const response = await axiosInstance.get(`/shops/${shopId}/notices/${noticeId}`);
  return response.data;
};

export const getNotice = async (request: GetNoticesRequest): Promise<GetNoticesResponse> => {
  const response = await axiosInstance.get(`/notices`, { params: request });
  return response.data;
};

export type { GetNoticesRequest };
