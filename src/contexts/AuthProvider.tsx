import React, { useState, useEffect, ReactNode, createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { Token, UserId, UserType } from '../types/apis/authentication/authentication';
import { axiosInstance } from '../apis/axiosInstance';

// 타입 정의
interface AuthContextType {
  token: Token | null;
  userType: UserType | null;
  userId: UserId | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface CustomJwtPayload extends JwtPayload {
  userId: UserId;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<Token | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [userId, setUserId] = useState<UserId | null>(null);
  const router = useRouter();

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

  const decodeToken = (param: string) => {
    try {
      const decodedToken = jwtDecode<CustomJwtPayload>(param);
      setUserId(decodedToken.userId);
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  };

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
    throw new Error('useToken must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
