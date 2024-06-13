import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { axiosInstance } from '../apis/axiosInstance';
import { GetUserItem } from '../types/apis/user/getUser';

// 컨텍스트 생성
interface TokenContextType {
  login: (email: string, password: string) => void;
  logout: () => void;
  token: string | null;
  setToken?: (token: string | null) => void;
  userInfo: GetUserItem | null;
  setUserInfo?: React.Dispatch<React.SetStateAction<GetUserItem | null>>;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

// 토큰을 제공하는 프로바이더
export const TokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<GetUserItem | null>(null);
  const router = useRouter();

  // 로그인 함수
  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/token', { email, password });
      const rawToken = response.data.item.token as string;
      const rawUser = response.data.item.user.item as GetUserItem;
      setToken(rawToken);
      setUserInfo(rawUser);
      console.log('로그인 성공');
      router.push('/');
    } catch (error) {
      console.error('로그인 실패', error);
    }
  };

  // 토큰과 사용자 정보가 변경될 때 실행
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
    // localStorage.removeItem('token');
    // localStorage.removeItem('userInfo');
  }, [token, userInfo]);

  // 컴포넌트가 처음 마운트될 때 실행
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedToken && storedUserInfo) {
      setToken(storedToken);
      setUserInfo(JSON.parse(storedUserInfo) as GetUserItem);
    }
  }, []);

  // 로그아웃 함수
  const logout = () => {
    setToken(null);
    setUserInfo(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    router.push('/');
  };

  return (
    <TokenContext.Provider value={{ login, logout, token, setToken, userInfo, setUserInfo }}>
      {children}
    </TokenContext.Provider>
  );
};

// 사용할 토큰 관련 커스텀 훅
export const useToken = (): TokenContextType => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};
