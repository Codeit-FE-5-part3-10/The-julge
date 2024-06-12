import React, { useState, useEffect, ReactNode, createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { Token, UserId, UserType } from '../types/apis/authentication/authentication';
import { axiosInstance } from '../apis/axiosInstance';

// 타입 정의
interface AuthContextType {
  token: Token;
  userType: UserType;
  userId: UserId;
  login: (email: string, password: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface CustomJwtPayload extends JwtPayload {
  userId: UserId;
}

// 기본값을 설정하지 않고 컨텍스트를 생성
const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<Token>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [userId, setUserId] = useState<UserId>(null);
  const router = useRouter();

  // 페이지가 처음 마운트될 때 실행
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserType = localStorage.getItem('userType');
    if (storedToken) {
      setToken(storedToken);
      decodeToken(storedToken);
      setUserType(storedUserType as UserType);
    }
  }, []);

  // 토큰 값이 변경될 때 실행
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('userType', userType as Exclude<UserType, null>);
      decodeToken(token);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
      setUserId(null);
      setUserType(null);
    }
  }, [token, userType]);

  // 토큰을 디코드하여 사용자 정보 설정
  const decodeToken = (param: string) => {
    try {
      const decodedToken = jwtDecode<CustomJwtPayload>(param);
      setUserId(decodedToken.userId);
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  };

  // 로그인 함수
  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/token', { email, password });
      setToken(response.data.item.token);
      setUserType(response.data.item.user.item.type);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  // 로그아웃 함수
  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, userId, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 커스텀 훅
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
