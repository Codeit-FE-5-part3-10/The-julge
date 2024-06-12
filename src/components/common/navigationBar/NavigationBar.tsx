import Logo from '@/public/images/global-logo.svg';
import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './NavigationBar.module.scss';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import SearchBarIcon from '@/public/images/navigationbar-search.svg';
import NotificationIcon from '@/public/images/navigationbar-empty.svg';
import NotificationIconNew from '@/public/images/navigationbar-new.svg';
import { useRouter } from 'next/router';
import { useToken } from '@/src/utils/TokenProvider';

type NavigationBarProps = {
  isSticky: boolean;
};

export default function NavigationBar({ isSticky }: NavigationBarProps) {
  const cx = classNames.bind(styles);
  const [searchTerm, setSearchTerm] = useState('');
  const [isTablet, setIsTablet] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const router = useRouter();
  const { token, setToken } = useToken(); // useToken 훅

  useEffect(() => {
    // 로컬 스토리지에서 토큰 값 가져오기
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, [setToken]);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    const handleResize = () => {
      setIsTablet(window.innerWidth >= 768);
    };
    console.log(token);

    window.addEventListener('resize', handleResize);
    handleResize(); // 초기 로드 시 크기 체크

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/search?keyword=${searchTerm}`);
    }
  };

  const handleLogout = () => {
    // 로컬 스토리지의 모든 값을 비우기
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className={cx('navBar', { sticky: isSticky })}>
      <div className={cx('logoButton_container')}>
        <div className={cx('logo_container')}>
          <Link href="/" className={cx('logo')}>
            <Image src={Logo} alt="로고"></Image>
          </Link>
        </div>

        {isTablet && (
          <div className={cx('searchBar-container-tablet')}>
            <input
              className={cx('searchBar')}
              type="text"
              placeholder="가게 이름으로 찾아보세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch} // Enter 키 이벤트 처리
            />
            <Image className={cx('searchBarIcon')} src={SearchBarIcon} alt="검색 아이콘" />
          </div>
        )}

        <div className={cx('buttons-container')}>
          {token ? (
            <>
              <Link href="/myprofile">내 프로필</Link>
              <button onClick={handleLogout}>로그아웃</button>
              <Link className={cx('notification')} href="/notifications">
                <Image src={NotificationIcon} alt="알림 아이콘"></Image>
              </Link>
            </>
          ) : (
            <>
              <Link href="/loginTest">로그인</Link>
              <Link href="/signup">회원가입</Link>
            </>
          )}
        </div>
      </div>

      {!isTablet && (
        <div className={cx('searchBar-container-mobile')}>
          <input
            className={cx('searchBar')}
            type="text"
            placeholder="가게 이름으로 찾아보세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch} // Enter 키 이벤트 처리
          />
          <Image className={cx('searchBarIcon')} src={SearchBarIcon} alt="검색 아이콘" />
        </div>
      )}
    </div>
  );
}
