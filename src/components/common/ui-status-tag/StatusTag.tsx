import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './StatusTag.module.scss';
import { useModal } from '@/src/contexts/ModalContext';
import { modalType } from '@/src/constants/constant';
import { useToken } from '@/src/contexts/TokenProvider';

const cx = classNames.bind(styles);

type Status = 'pending' | 'rejected' | 'accepted' | 'canceled';

interface StatusTagProps {
  status: Status;
  id: string;
}

export const StatusTag: React.FC<StatusTagProps> = ({ status, id: applicationId }) => {
  const { openModal } = useModal();
  const { userInfo } = useToken();
  const { type: userType } = userInfo || { id: null, type: null };
  const [isHovered, setIsHovered] = useState(false);

  let text: string;
  let className: string;

  switch (status) {
    case 'pending':
      text = '대기중';
      className = 'pending';
      break;
    case 'rejected':
      text = '거절';
      className = 'rejected';
      break;
    case 'accepted':
      text = '승인 완료';
      className = 'accepted';
      break;
    case 'canceled':
      text = '취소함';
      className = 'canceled';
      break;
  }

  return (
    <div className={cx('container')}>
      {status === 'pending' ? (
        userType === 'employer' ? (
          <div className={cx('box')}>
            <button
              type="button"
              className={cx('button', 'enabled', 'decline')}
              onClick={() => openModal(modalType.decline, applicationId)}
            >
              거절하기
            </button>
            <button
              type="button"
              className={cx('button', 'enabled', 'approve')}
              onClick={() => openModal(modalType.approve, applicationId)}
            >
              승인하기
            </button>
          </div>
        ) : userType === 'employee' ? (
          <div className={cx('box')}>
            <button
              type="button"
              className={cx('button', 'disabled', className)}
              onClick={() => openModal(modalType.cancel, applicationId)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isHovered ? '취소하기' : '대기중'}
            </button>
          </div>
        ) : null
      ) : (
        <button className={cx('button', 'disabled', className)} type="button" disabled>
          {text}
        </button>
      )}
    </div>
  );
};
