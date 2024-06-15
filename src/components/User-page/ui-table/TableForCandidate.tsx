import React, { useState } from 'react';
import classNames from 'classnames/bind';
import StatusTag from '@/src/components/User-page/ui-status-tag/StatusTag'; // StatusTag 컴포넌트 임포트 수정
import styles from './Table.module.scss';
import { boundaries, initialPage, siblings, countPerPage } from './constant';
import { Item, UserResponse } from '@/src/types/apis/application/getUserApplications';
import { Pagination } from '../../common/ui-pagination/Pagination';
import { count } from 'console';

const cx = classNames.bind(styles);

interface UserApplicationProps {
  userApplicationData: UserResponse;
  name: any;
}

const UserApplicationTable: React.FC<UserApplicationProps> = ({ userApplicationData }) => {
  const [page, setPage] = useState<number>(initialPage);
  const Applicationlist: Item[] = userApplicationData?.items ?? [];
  const total = Math.ceil((userApplicationData?.count ?? 0) / countPerPage);

  //시간 함수
  const formatDate = (date: Date): string => {
    const year = date.getUTCFullYear();
    const month = `0${date.getUTCMonth() + 1}`.slice(-2); // 월은 0부터 시작하므로 +1 해줘야 함
    const day = `0${date.getUTCDate()}`.slice(-2);
    const hours = `0${date.getUTCHours()}`.slice(-2);
    const minutes = `0${date.getUTCMinutes()}`.slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  //단위 함수
  const formatNumberWithCommas = (value: number): string => value.toLocaleString();
  const pageApplicationlist = Applicationlist.slice((page - 1) * countPerPage, page * countPerPage);

  return (
    <div className={cx('container')}>
      <table className={cx('table')}>
        <thead>
          <tr>
            <th>가게</th>
            <th>일자</th>
            <th>시급</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {pageApplicationlist.map((itemData: Item, index: number) => {
            const shopItem = itemData.item.shop.item;
            const name = typeof shopItem === 'object' ? shopItem.name : '';
            const { status } = itemData.item;
            const { id, startsAt, hourlyPay, workhour } = itemData.item.notice.item;
            const dateObj = new Date(startsAt);
            const formattedStartDate = formatDate(dateObj);

            // 4시간 추가
            const endDateObj = new Date(dateObj.getTime() + workhour * 60 * 60 * 1000);
            const formattedEndDate = formatDate(endDateObj);
            const formattedDateRange = `${formattedStartDate} ~ ${formattedEndDate}`;

            const formattedValue = formatNumberWithCommas(hourlyPay);

            return (
              <tr key={index}>
                <td>{name}</td>
                <td>{`${formattedDateRange} (${workhour}시간)`}</td>
                <td>{`${formattedValue}원`}</td>
                <td>
                  <StatusTag status={`${status}`} id={id}/>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
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

export default UserApplicationTable;
