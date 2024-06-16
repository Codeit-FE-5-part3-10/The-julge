// NavigationBar.tsx
import Image from 'next/image';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './NavigationBar.module.scss';
import Logo from '@/public/images/global-logo.svg';
import SearchBarIcon from '@/public/images/navigationbar-search.svg';
import NotificationIcon from '@/public/images/navigationbar-empty.svg';
import { getUser } from '@/src/apis/user';
import { useToken } from '@/src/utils/TokenProvider';

type NavigationBarProps = {
  isSticky?: boolean;
};

export default function NavigationBar({ isSticky }: NavigationBarProps) {
  const cx = classNames.bind(styles);
  const [searchTerm, setSearchTerm] = useState('');
  const [shopId, setShopId] = useState<string | null>(null);
  const router = useRouter();
  const { userInfo, logout } = useToken();
  const { id: userId, type: userType } = userInfo || { id: null, type: null };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/search?keyword=${searchTerm}`);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (userType === 'employer' && userId) {
        try {
          const response = await getUser(userId);
          if (response.item.shop) {
            setShopId(response.item.shop.item.id);
          } else {
            setShopId(null);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [userType, userId]);

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
            onKeyDown={handleSearch}
          />
        </div>
        {userType === 'employer' && (
          <div className={cx('buttons')}>
            <Link href={shopId ? `/shops/${shopId}` : 'shops/empty'} className={cx('text')}>
              내 가게
            </Link>
            <button type="button" onClick={logout} className={cx('button')}>
              로그아웃
            </button>
            <Image src={NotificationIcon} className={cx('icon')} alt="알림 아이콘" />
          </div>
        )}
        {userType === 'employee' && (
          <div className={cx('buttons')}>
            <Link href={`user/${userId}`} className={cx('text')}>
              내 프로필
            </Link>
            <button type="button" onClick={logout} className={cx('button')}>
              로그아웃
            </button>
            <Image src={NotificationIcon} className={cx('icon')} alt="알림 아이콘" />
          </div>
        )}

        {userType === null && (
          <div className={cx('buttons')}>
            <Link href="/login" className={cx('text')}>
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
