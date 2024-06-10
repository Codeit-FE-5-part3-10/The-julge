import React from 'react';
import classNames from 'classnames/bind';
import { StatusTag } from '../ui-status-tag/StatusTag';
import styles from './Table.module.scss';

const cx = classNames.bind(styles);

export interface TableBodyType {
  id: string;
  status: 'pending' | 'accepted' | 'rejected' | 'canceled';
  [key: string]: string;
}

interface TableProps {
  headers: string[];
  body: TableBodyType[];
}

export const Table: React.FC<TableProps> = ({ headers, body }) => (
  <table className={cx('table')}>
    <thead>
      <tr>
        {headers.map((header) => (
          <th>{header}</th>
        ))}
        <th>상태</th>
      </tr>
    </thead>
    <tbody>
      {body.map((application) => (
        <tr key={application.id}>
          {headers.map((header) => (
            <td>{application[header]}</td>
          ))}
          <td>
            <StatusTag status={application.status} />
            {/* TODO: status pending 일 때, 사장과 알바 각각 '거절하기'와 '승인하기' 버튼 & '취소하기' 버튼 */}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
