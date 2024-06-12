import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { axiosInstance } from '../apis/axiosInstance';
import { useRouter } from 'next/router';
import { atom, useRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { UserAtom, UserInfoType } from './atoms';

type Token = string | null;

// 컨텍스트 생성
interface TokenContextType {
  token: Token;
  setToken: (token: Token) => void;
  login: any;
  userInfo: UserInfoType | null;
  setUserInfo: (userInfo: UserInfoType) => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<Token>(null);
  const router = useRouter();
  const [userInfo, setUserInfo] = useRecoilState(UserAtom);

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/token', { email, password });
      setToken(response.data.item.token);
      setUserInfo(response.data.item.user.item);
      localStorage.setItem('token', response.data.item.token); // 토큰을 로컬 스토리지에 저장
      console.log('로그인성공');
      router.push('/');
    } catch (error) {
      console.error('로그인 실패', error);
    }
  };

  return (
    <TokenContext.Provider value={{ token, setToken, login, userInfo, setUserInfo }}>
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
