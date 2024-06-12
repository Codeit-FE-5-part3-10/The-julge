import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { axiosInstance } from '../apis/axiosInstance';
import { useRouter } from 'next/router';
import { RecoilRoot, atom, useRecoilState } from 'recoil';
import { userInfoState } from '@/recoil/atoms';
import { recoilPersist } from 'recoil-persist';

type Token = string | null;

// 컨텍스트 생성
interface TokenContextType {
  token: Token;
  setToken: (token: Token) => void;
  login: any;
  userInfo: UserInfoType | null;
  setUserInfo: (userInfo: UserInfoType) => void;
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

const { persistAtom } = recoilPersist();
export const UserAtom = atom({
  key: 'UserAtom',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

// 토큰을 제공하는 프로바이더
export const TokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<Token>(null);
  const router = useRouter();
  const [userInfo, setUserInfo] = useRecoilState(UserAtom);
  //  useState<UserInfoType | null>(null); // 유저 정보를 단일 객체로 담기

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/token', { email, password });
      setToken(response.data.item.token);
      setUserInfo(response.data.item.user.item);
      localStorage.setItem('token', response.data.item.token); // 토큰을 로컬 스토리지에 저장
      console.log('로그인성공');
      console.log('userInfo: ', userInfo);
      router.push('/');
    } catch (error) {
      console.error('로그인 실패', error);
    }
  };
  useEffect(() => {
    console.log('userInfo: ', userInfo);
  }, [userInfo]);
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
