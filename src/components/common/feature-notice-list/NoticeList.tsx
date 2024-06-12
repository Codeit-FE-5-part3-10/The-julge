import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './NoticeList.module.scss';
import CardItem from '../cardItem/CardItem';
import { getToken } from '@/src/apis/token';
import { useToken } from '@/src/utils/TokenProvider';
import { useUserId } from '@/src/utils/useUserId';

const cx = classNames.bind(styles);

interface CardItemProps {
  title: string;
  date: string;
  workhour: number;
  location: string;
  wage: number;
  imageUrl: string;
  originalWage: number;
}

interface NoticeListProps {
  items: CardItemProps[];
}

export const NoticeList: React.FC<NoticeListProps> = ({ items }) => {
  const { token, setToken } = useToken();
  const userId = useUserId();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, [setToken]);

  return (
    <div className={cx('list')}>
      {items?.map((item, index) => (
        <Link href={``} key={index}>
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
