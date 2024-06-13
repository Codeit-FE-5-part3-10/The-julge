import axios from 'axios';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
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
  userInfo: UserInfoType[];
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfoType[]>>;
}

export interface UserInfoType {
  address: string;
  bio: string;
  email: string;
  id: string;
  name: string;
  phone: string;
  type: string;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);
const API_URL = 'https://bootcamp-api.codeit.kr/api/0-1/the-julge';
// 토큰을 제공하는 프로바이더
export const TokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<Token>(null);
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfoType[]>([]); // 유저 정보 담기

  const login = async (email: string, password: string) => {
    const response = await axiosInstance.post(`${API_URL}/token`, { email, password });
    console.log(response);
    setToken(response.data.item.token);
    setUserInfo(response.data.item.user.item);
    localStorage.setItem('token', response.data.item.token); // 토큰을 로컬 스토리지에 저장
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
