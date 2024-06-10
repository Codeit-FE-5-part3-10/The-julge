import { axiosInstance } from '@/src/apis/axiosInstance';
import { TEST_ID } from '@/src/constants/constant';
import { useState, useEffect } from 'react';

export default function Test() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/shops/${TEST_ID.shop}`)
      .then((response) => {
        const responseData = response.data;
        setData(responseData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}
