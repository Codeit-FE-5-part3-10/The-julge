import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useQuery } from '@tanstack/react-query';
import styles from './ListNotice.module.scss';
import { getShopsNotices } from '@/src/apis/shops';
import CardItem from '../cardItem/CardItem';
import { Pagination } from '../ui-pagination/Pagination';
import { boundaries, initialPage, siblings, countPerPage } from './constant';

const cx = classNames.bind(styles);

interface ListNoticeProps {
  title: string;
  location: string;
  shopId: string;
}

export const ListNotice: React.FC<ListNoticeProps> = ({ title, location, shopId }) => {
  const [page, setPage] = useState<number>(initialPage);

  const {
    data: notices,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['getShopsNotices', shopId, page],
    queryFn: () => getShopsNotices(shopId, page, countPerPage),
    enabled: !!shopId,
  });

  //TODO: 로딩과 에러 처리
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading notices</div>;
  }

  if (!notices || !notices.items || notices.items.length === 0) {
    return <div>No notices</div>;
  }

  const total = Math.ceil(notices.count / countPerPage);

  return (
    <div className={cx('container')}>
      <div className={cx('list')}>
        {notices.items.map((notice) => {
          const { id, startsAt, workhour, hourlyPay } = notice.item;
          const time = workhour.toString();
          return (
            <CardItem
              key={id}
              title={title}
              location={location}
              date={startsAt}
              time={time}
              wage={hourlyPay}
            />
          );
        })}
      </div>
      <Pagination
        initialPage={initialPage}
        siblings={siblings}
        boundaries={boundaries}
        page={page}
        total={total}
        onChange={setPage}
      />
    </div>
  );
};
