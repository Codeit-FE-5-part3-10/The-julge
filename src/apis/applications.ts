import axios from 'axios';
import { getShopNoticeApplicationsResponse } from '../types/apis/application/getShopNoticeApplications';
import { axiosInstance } from './axiosInstance';

// 가게의 특정 공고의 지원 목록 조회
export const getShopNoticeApplications = async (
  shopId: string,
  noticeId: string,
  page: number,
  countPerPage: number
): Promise<getShopNoticeApplicationsResponse> => {
  const response = await axiosInstance.get(
    `/shops/${shopId}/notices/${noticeId}/applications?offset=${(page - 1) * countPerPage}&limit=${countPerPage}`
  );
  return response.data;
};

// 가게의 특정 공고 지원 승인, 거절 또는 취소
export const putShopNoticeApplicationStatus = async (
  shopId: string,
  noticeId: string,
  applicationId: string,
  status: 'accepted' | 'rejected' | 'canceled',
  token: string
) => {
  const response = await axios.put(
    `/shops/${shopId}/notices/${noticeId}/application/${applicationId}`,
    {
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
