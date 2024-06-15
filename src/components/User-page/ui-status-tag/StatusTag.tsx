// StatusTag.tsx
import React from 'react';
import classNames from 'classnames/bind';
import styles from './StatusTag.module.scss';

const cx = classNames.bind(styles);

interface StatusTagProps {
  status: 'pending' | 'rejected' | 'accepted' | 'canceled'; // status는 '대기중', '거절', '승인 완료', '취소함' 중 하나일 수 있습니다.
}

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  let text: string; // 표시할 텍스트
  let className: string; // 스타일링 클래스 이름

  // status에 따라 텍스트와 클래스 이름을 설정합니다.
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
    default:
      text = '알 수 없음';
      className = 'unknown';
      break;
  }

  return (
    <button className={cx('button', 'disabled', className)} type="button" disabled>
      {text}
    </button>
  );
};

export default StatusTag;
