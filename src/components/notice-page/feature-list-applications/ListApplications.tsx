import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useQuery } from '@tanstack/react-query';
import { Pagination } from '../../common/ui-pagination/Pagination';
import { Table } from '../../common/ui-table/Table';
import styles from './ListApplications.module.scss';
import { initialPage, boundaries, countPerPage, siblings, tableHeaders } from './constants';
import { getShopNoticeApplications } from '@/src/apis/applications';
import { QuestionModal } from '../../common/ui-modal-question/QuestionModal';
import { modalType } from '@/src/constants/constant';
import { useModal } from '@/src/contexts/ModalContext';

const cx = classNames.bind(styles);

export const ListApplication: React.FC = () => {
  const [page, setPage] = useState<number>(initialPage);
  const { shopId, noticeId, currentModal } = useModal();

  const queryEnabled = typeof shopId === 'string' && typeof noticeId === 'string';

  const { data, error, isLoading } = useQuery({
    queryKey: ['getShopNoticeApplications', shopId, noticeId, page, countPerPage],
    queryFn: async () => {
      if (!queryEnabled) return { items: [], count: 0 };
      const response = await getShopNoticeApplications(shopId, noticeId, page, countPerPage);
      return response;
    },
    enabled: queryEnabled,
  });

  if (!queryEnabled) {
    return <div>Invalid shop or notice ID</div>;
  }

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

  // 테이블 prop 생성
  const tableBody = data.items.map((application) => ({
    id: application.item.id || '',
    status: application.item.status,
    [tableHeaders[0]]: application.item.user.item.name || '',
    [tableHeaders[1]]: application.item.user.item.phone || '',
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
        <QuestionModal
          isOpen={currentModal === modalType.decline}
          modalText="신청을 거절하시겠어요?"
          targetStatus="rejected"
        />
        <QuestionModal
          isOpen={currentModal === modalType.approve}
          modalText="신청을 승인하시겠어요?"
          targetStatus="accepted"
        />
      </div>
    </div>
  );
};
