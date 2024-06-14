import { axiosInstance } from './axiosInstance';
import { GetUserRequest, GetUserResponse } from '../types/apis/user/getUser';
import { getShopNoticeApplicationsResponse } from '../types/apis/application/getShopNoticeApplications';

//'42455be1-ea49-49cc-a89f-1400c96fce09'

export const getUser = async (user_id: string): Promise<GetUserResponse> => {
  try {
    const response = await axiosInstance.get<GetUserResponse>(`/users/${user_id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Error fetching user data');
  }
};

export const getUserItem = async (user_Id: string): Promise<GetUserRequest> => {
  const response = await axiosInstance.get<GetUserRequest>(`/users/${user_Id}`);
  return response.data;
};

export const getUserApplication = async (
  user_id: string,
  token: string
): Promise<getShopNoticeApplicationsResponse> => {
  const response = await axiosInstance.get<getShopNoticeApplicationsResponse>(
   ` /users/${user_id}/applications`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
