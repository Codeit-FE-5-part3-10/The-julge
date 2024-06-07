import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Pagination } from '../ui-pagination/Pagination';
import { TableForOwner } from '../ui-table/TableForOwner';
import { TableForCandidate } from '../ui-table/TableForCandidate';
import styles from './ListApplication.module.scss';
import { items } from '@/src/types/types';
import { GetApplicationsByShopByNotice, GetApplicationsByUser } from '@/src/apis/getApplications';

const cx = classNames.bind(styles);

interface ListApplicationProps {
  isOwnerPage: boolean;
  initialPage: number;
  siblings: number;
  boundaries: number;
  countPerPage: number;
}

type ListApplicationType = React.FC<ListApplicationProps>;

export const ListApplication: ListApplicationType = ({
  isOwnerPage,
  initialPage,
  siblings,
  boundaries,
  countPerPage,
}) => {
  const [page, setPage] = useState<number>(initialPage);
  const [applications, setApplications] = useState<items>([]);
  const [total, setTotal] = useState<number>(1);

  useEffect(() => {
    isOwnerPage
      ? GetApplicationsByShopByNotice(setApplications, setTotal, page, countPerPage)
      : GetApplicationsByUser(setApplications, setTotal, page, countPerPage);
  }, [page]);

  return (
    <div className={cx('container')}>
      <div className={cx('wrapper')}>
        {isOwnerPage ? (
          <TableForOwner applications={applications} />
        ) : (
          <TableForCandidate applications={applications} />
        )}
        <Pagination
          initialPage={initialPage}
          page={page}
          siblings={siblings}
          boundaries={boundaries}
          total={total}
          onChange={setPage}
        />
      </div>
    </div>
  );
};
