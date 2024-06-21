import { jwtDecode } from 'jwt-decode';
import { axiosInstance } from './axiosInstance';
import { GetTokenResponse } from '@/src/types/apis/user/getToken';

// eslint-disable-next-line max-len
export const getToken = async (
  userEmail: string,
  userPassword: string
): Promise<GetTokenResponse> => {
  try {
    const response = await axiosInstance.post<GetTokenResponse>('/token', {
      email: userEmail,
      password: userPassword,
    });

    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw new Error('존재하지 않거나 비밀번호가 일치하지 않습니다');
  }
};

export const transTokenUserId = (token: string): string => {
  try {
    if (token === '' || token == null) {
      return '';
    }
    const decoded: { userId: string } = jwtDecode(token);
    return decoded.userId;
  } catch (error) {
    console.error('Invalid token:', error);
    return '';
  }
};
