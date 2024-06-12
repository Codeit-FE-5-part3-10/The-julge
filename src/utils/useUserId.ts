import { useEffect, useState } from 'react';
import { useToken } from '@/src/utils/TokenProvider';
import { decodeUserId } from '@/src/utils/decodeUserId';

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
