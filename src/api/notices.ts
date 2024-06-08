import {
  GetNoticesRequest,
  GetNoticesResponse,
  PostNoticeRequest,
  PostNoticeResponse,
} from '@/src/types/api/noticeType';
import { axiosInstance } from './axiosInstance';

export const getNotices = async (request: GetNoticesRequest): Promise<GetNoticesResponse> => {
  // const { offset, limit } = request;
  // const response = await axiosInstance.get(`/notices`, { params: { offset, limit } });
  // console.log(request);
  // return response.data;
  const response = await axiosInstance.get(`/notices`, { params: request });
  return response.data;
};

export const postNotice = async (request: PostNoticeRequest): Promise<PostNoticeResponse> => {
  const response = await axiosInstance.post(`shops/${request.shopId}/notices`, request);
  return response.data;
};
export type { GetNoticesRequest };
