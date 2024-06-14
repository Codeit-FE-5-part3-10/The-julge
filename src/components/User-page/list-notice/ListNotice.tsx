import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import styles from './ListNotice.module.scss';
import CardItem from '../../common/cardItem/CardItem';
import { Pagination } from '../../common/ui-pagination/Pagination';
import { boundaries, initialPage, siblings, countPerPage } from './constant';
import { getShopNotices } from '@/src/apis/notices';

const cx = classNames.bind(styles);

interface Notice {
  id: string;
  startsAt: string;
  workhour: string;
  hourlyPay: number;
}

interface ListNoticeProps {
  name: string;
  location: string;
  imageUrl: string;
  originalWage: number;
  shopId: string;
}

export const ListNotice: React.FC<ListNoticeProps> = ({
  name,
  location,
  imageUrl,
  originalWage,
  shopId,
}) => {
  const [page, setPage] = useState<number>(initialPage);

  const {
    data: notices,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['getShopNotices', shopId, page],
    queryFn: () => getShopNotices(shopId, page, countPerPage),
    enabled: !!shopId,
  });

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>공고를 불러오는 중 오류가 발생했습니다.</div>;
  }

  if (!notices || !notices.items || notices.items.length === 0) {
    return <div>공고가 없습니다.</div>;
  }

  const total = Math.ceil(notices.count / countPerPage);

  return (
    <div className={cx('container')}>
      <div className={cx('list')}>
        {notices.items.map((notice: Notice) => (
          <Link key={notice.id} href={`/shops/${shopId}/notices/${notice.id}`}>
            <CardItem
              date={notice.startsAt}
              time={notice.workhour}
              wage={notice.hourlyPay}
              title={name}
              location={location}
              imageUrl={imageUrl}
              originalWage={originalWage}
            />
          </Link>
        ))}
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
