import { useEffect, useState } from 'react';
import { decodeUserId } from '@/src/utils/decodeUserId';
import { useToken } from '../contexts/TokenProvider';

export const useUserId = () => {
  const { token } = useToken();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      const userIdFromToken = decodeUserId(token);
      setUserId(userIdFromToken);
    }
  }, [token]);

  return userId;
};
