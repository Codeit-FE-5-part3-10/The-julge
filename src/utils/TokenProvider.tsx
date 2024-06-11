import axios from 'axios';
import { ReactNode, createContext, useContext, useState } from 'react';
import { axiosInstance } from '../apis/axiosInstance';
import { useRouter } from 'next/router';

// 테스트 토큰
// wjy123@test.com  test123 employee
const TestToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4MWYzNWQ2Mi1hNzM0LTRkOWUtOGQ4Yi05NzNhMzkxNjEzNDEiLCJpYXQiOjE3MTgxMjQyMjd9.BM9TuI8dVRJ5W10EQLTmPEGFtMFhggR4gj4iXQYU5ug';
const email = 'wjy123@test.com';
const password = 'test123';

type Token = string | null;

// 컨텍스트 생성
interface TokenContextType {
  token: Token;
  setToken: (token: Token) => void;
  login: any;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

// 토큰을 제공하는 프로바이더
export const TokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<Token>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/token', { email, password });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token); // 토큰을 로컬 스토리지에 저장
      console.log('로그인성공');
      router.push('/');
    } catch (error) {
      console.error('로그인 실패', error);
    }
  };

  return (
    <TokenContext.Provider value={{ token, setToken, login }}>{children}</TokenContext.Provider>
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
