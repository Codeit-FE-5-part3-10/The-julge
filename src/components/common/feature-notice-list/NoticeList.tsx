import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './NoticeList.module.scss';
import CardItem from '../cardItem/CardItem';
import { getToken } from '@/src/apis/token';
import { useToken } from '@/src/utils/TokenProvider';
import { useUserId } from '@/src/utils/useUserId';
import { getUser } from '@/src/apis/user';
import { useQuery } from '@tanstack/react-query';

const cx = classNames.bind(styles);

interface CardItemProps {
  title: string;
  date: string;
  workhour: number;
  location: string;
  wage: number;
  imageUrl: string;
  originalWage: number;
  shopId?: string;
  noticeId?: string;
}

interface NoticeListProps {
  items: CardItemProps[];
}

export const NoticeList: React.FC<NoticeListProps> = ({ items }) => {
  const { token, userInfo, setToken } = useToken();
  const userId = useUserId();
  const [employInfo, setEmployInfo] = useState<'employee' | 'employer' | undefined>();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, [setToken]);

  //예시 코드입니당 TODO. 삭제
  // const {
  //   data: profileData,
  //   isLoading: isProfileLoading,
  //   error: profileError,
  // } = useQuery({
  //   queryKey: ['profile', userId],
  //   queryFn: async () => {
  //     if (userId) {
  //       const result = await getUserType(userId);
  //       setEmployInfo(profileData?.item.type);
  //       return result;
  //     }
  //     return null;
  //   },
  //   enabled: !!userId, // userId가 존재할 때만 쿼리 실행
  // });
  // console.log(profileData?.item.type);

  return (
    <div className={cx('list')}>
      {items?.map((item, index) => (
        <Link href={`/shops/${item.shopId}/notices/${item.noticeId}`} key={index}>
          <CardItem
            title={item.title}
            date={item.date}
            time={item.workhour}
            location={item.location}
            wage={item.wage}
            imageUrl={item.imageUrl}
            originalWage={item.originalWage}
          />
        </Link>
      ))}
    </div>
  );
};
