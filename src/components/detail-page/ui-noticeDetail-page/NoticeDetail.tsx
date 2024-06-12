import { useToken } from '@/src/utils/TokenProvider';
import { useEffect, useState } from 'react';

export default function NoticeDetail() {
  const { token, setToken } = useToken();
  const [userId, setUserId] = useState<string | null>(null);
  const storedToken = localStorage.getItem('token');

  useEffect(() => {
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
    <div>
      <div>상세페이지</div>
    </div>
  );
}
