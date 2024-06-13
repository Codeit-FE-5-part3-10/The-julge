import { useToken } from '@/src/utils/TokenProvider';
import { useEffect, useState } from 'react';

export default function NoticeDetail() {
  const { token, setToken } = useToken();
  const [userId, setUserId] = useState<string | null>(null);
  const storedToken = localStorage.getItem('token');

  return (
    <div>
      <div>상세페이지</div>
    </div>
  );
}
