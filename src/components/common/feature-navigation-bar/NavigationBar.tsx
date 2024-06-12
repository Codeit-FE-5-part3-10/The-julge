import Image from 'next/image';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useToken } from '@/src/contexts/TokenProvider';
import styles from './NavigationBar.module.scss';
import Logo from '@/public/images/global-logo.svg';
import SearchBarIcon from '@/public/images/navigationbar-search.svg';
import NotificationIcon from '@/public/images/navigationbar-empty.svg';

type NavigationBarProps = {
  isSticky: boolean;
};

export default function NavigationBar({ isSticky }: NavigationBarProps) {
  const cx = classNames.bind(styles);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { token, setToken } = useToken(); // useToken 훅

  useEffect(() => {
    // 로컬 스토리지에서 토큰 값 가져오기
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, [setToken]);

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
    <div className={cx('wrapper', { sticky: isSticky })}>
      <div className={cx('container')}>
        <Link href="/">
          <Image src={Logo} className={cx('logo')} alt="로고" />
        </Link>

        <div className={cx('search')}>
          <Image className={cx('icon')} src={SearchBarIcon} alt="검색 아이콘" />
          <input
            className={cx('input')}
            type="text"
            placeholder="가게 이름으로 찾아보세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch} // Enter 키 이벤트 처리
          />
        </div>

        {token ? (
          <div className={cx('buttons')}>
            <Link href="/myprofile" className={cx('text')}>
              내 프로필
            </Link>
            <button type="button" onClick={handleLogout} className={cx('button')}>
              로그아웃
            </button>
            <Image src={NotificationIcon} className={cx('icon')} alt="알림 아이콘" />
          </div>
        ) : (
          <div className={cx('buttons')}>
            <Link href="/loginTest" className={cx('text')}>
              로그인
            </Link>
            <Link href="/signup" className={cx('text')}>
              회원가입
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
