import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { Pagination } from '../../common/ui-pagination/Pagination';
import { Table } from '../../common/ui-table/Table';
import styles from './ListApplications.module.scss';
import { initialPage, boundaries, countPerPage, siblings, tableHeaders } from './constants';
import { getShopNoticeApplications } from '@/src/apis/applications';

const cx = classNames.bind(styles);

export const ListApplication: React.FC = () => {
  const [page, setPage] = useState<number>(initialPage);

  const router = useRouter();

  // NOTE: 2.필요한 데이터를 불러와주세요.
  const { shop_id: shopId, notice_id: noticeId } = router.query;

  if (typeof shopId !== 'string') {
    return <div>Invalid shop ID</div>;
  }

  if (typeof noticeId !== 'string') {
    return <div>Invalid notice ID</div>;
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['getShopNoticeApplications', shopId, noticeId, page, countPerPage],
    queryFn: async () => {
      const response = await getShopNoticeApplications(shopId, noticeId, page, countPerPage);
      return response;
    },
    enabled: !!shopId && !!noticeId,
  });

  // TODO: 로딩, 오류 처리
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading shop data</div>;
  }

  if (!data || !data.items) {
    return <div>No data</div>;
  }

  const total = Math.ceil(data.count / countPerPage);

  // NOTE: 3.불러온 데이터를 프로퍼티 값으로 넣어주세요.
  const tableBody = data.items.map((application) => ({
    id: application.item.id || '',
    status: application.item.status,
    // ex.신청자
    [tableHeaders[0]]: application.item.user.item.name || '',
    // ex.전화번호
    [tableHeaders[1]]: application.item.user.item.phone || '',
    // ex.소개
    [tableHeaders[2]]: application.item.user.item.bio || '',
  }));

  return (
    <div className={cx('container')}>
      <div className={cx('wrapper')}>
        <Table headers={tableHeaders} body={tableBody} />
        <Pagination
          initialPage={initialPage}
          siblings={siblings}
          boundaries={boundaries}
          page={page}
          total={total}
          onChange={setPage}
        />
      </div>
    </div>
  );
};
