import type { GetShopResponse } from '../types/apis/shop/getShop';
import { postShopRequest } from '../types/apis/shop/postShop';
import { axiosInstance } from './axiosInstance';

export const getShop = async (id: string): Promise<GetShopResponse> => {
  const response = await axiosInstance.get(`/shops/${id}`);
  return response.data;
};

export const postShop = async (token: string | null, body: postShopRequest): Promise<any> => {
  /*   const response = await axiosInstance.post('/shops', JSON.stringify(body), {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data; */

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/shops`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to upload image to S3');
    }
  } catch (error) {
    console.error('Error uploading image to S3:', error);
  }
};
