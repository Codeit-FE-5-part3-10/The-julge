import classNames from 'classnames/bind';
import Link from 'next/link';
import { useEffect } from 'react';
import styles from './NoticeList.module.scss';
<<<<<<< HEAD
import CardItem from '../cardItem/CardItem';
import { getToken } from '@/src/apis/token';
import { useUserId } from '@/src/utils/useUserId';
import { getUser } from '@/src/apis/user';
import { useQuery } from '@tanstack/react-query';
import { useToken } from '@/src/contexts/TokenProvider';
=======
import { CardItem } from '../cardItem/CardItem';
>>>>>>> develop

const cx = classNames.bind(styles);

export interface CardItemProps {
  title: string;
  date: string;
  workhour: number;
  location: string;
  wage: number;
  imageUrl: string;
  originalWage: number;
  shopId?: string;
  noticeId?: string;
  closed: boolean;
}

interface NoticeListProps {
  items: CardItemProps[];
}

const MAX_ITEMS = 6; // 최대 저장할 요소 개수

export const NoticeList: React.FC<NoticeListProps> = ({ items }) => {
  const handleOnClick = (item: CardItemProps) => {
    const storedItems = JSON.parse(localStorage.getItem('recentItems') || '[]') as CardItemProps[];

    // 중복된 noticeId가 있는지 확인
    if (storedItems.some((storedItem) => storedItem.noticeId === item.noticeId)) {
      return; // 중복된 경우 저장하지 않고 종료
    }

    // 새로운 아이템을 배열의 맨 앞에 추가
    const newItems = [item, ...storedItems.slice(0, MAX_ITEMS - 1)];

    localStorage.setItem('recentItems', JSON.stringify(newItems));
  };

  useEffect(() => {
    // 로컬 스토리지에서 저장된 최근 본 공고를 가져옵니다.
    const storedItems = JSON.parse(localStorage.getItem('recentItems') || '[]') as CardItemProps[];

    // 최신화된 최근 본 공고를 로컬 스토리지에 다시 저장합니다.
    localStorage.setItem('recentItems', JSON.stringify(storedItems));
  }, [localStorage]);

  return (
    <div className={cx('list')}>
      {items?.map((item, index) => {
        const isPastDate = new Date(item.date) < new Date();
        return (
          <Link
            href={`/shops/${item.shopId}/notices/${item.noticeId}`}
            key={index}
            onClick={() => handleOnClick(item)}
            className={cx('notice', { 'is-end': item.closed || isPastDate })}
          >
            <div className={cx('notice')}>
              <CardItem
                title={item.title}
                date={item.date}
                time={item.workhour}
                location={item.location}
                wage={item.wage}
                imageUrl={item.imageUrl}
                originalWage={item.originalWage}
                closed={item.closed}
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
};
