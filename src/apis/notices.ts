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
