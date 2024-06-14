import { useEffect, useState } from 'react';
import { DetailNotice } from '@/src/components/notice-page/ui-detail-notice/DetailNotice';
import { useToken } from '@/src/utils/TokenProvider';

function noticeDetail() {
  const { token, setToken } = useToken();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, [setToken]);
  useEffect(() => {
    if (token) {
      // 토큰을 디코드해서 userId를 얻음.
      const decodedToken: any = JSON.parse(atob(token.split('.')[1]));
      const userIdFromToken = decodedToken.userId;
      setUserId(userIdFromToken);
    }
  }, [token]);

  return (
    <>
      <div></div>
    </>
  );
}
