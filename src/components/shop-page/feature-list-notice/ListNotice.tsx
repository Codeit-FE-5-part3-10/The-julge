import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useQuery } from '@tanstack/react-query';
import styles from './ListNotice.module.scss';
import CardItem from '../../common/cardItem/CardItem';
import { Pagination } from '../../common/ui-pagination/Pagination';
import { boundaries, initialPage, siblings, countPerPage } from './constant';
import { getShopNotices } from '@/src/apis/notices';

const cx = classNames.bind(styles);

interface ListNoticeProps {
  params: { name: string; location: string; imageUrl: string; originalWage: number };
  shopId: string;
}

export const ListNotice: React.FC<ListNoticeProps> = ({
  params: { name, location, imageUrl, originalWage },
  shopId,
}) => {
  const [page, setPage] = useState<number>(initialPage);

  const {
    data: notices,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['getShopsNotices', shopId, page],
    queryFn: () => getShopNotices(shopId, page, countPerPage),
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
          return (
            <CardItem
              key={id}
              date={startsAt}
              time={workhour}
              wage={hourlyPay}
              title={name}
              location={location}
              imageUrl={imageUrl}
              originalWage={originalWage}
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
