import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './NoticeList.module.scss';
import CardItem from '../cardItem/CardItem';
import { getToken } from '@/src/apis/token';
import { useUserId } from '@/src/utils/useUserId';
import { getUser } from '@/src/apis/user';
import { useQuery } from '@tanstack/react-query';
import { useToken } from '@/src/contexts/TokenProvider';

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
