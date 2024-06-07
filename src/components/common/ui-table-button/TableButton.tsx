import classNames from 'classnames/bind';
import styles from './TableButton.module.scss';

const cx = classNames.bind(styles);

interface TableButtonProps {
  status: 'pending' | 'rejected' | 'accepted' | 'canceled';
}

export const TableButton = ({ status }: TableButtonProps) => {
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

  return <button className={cx('button', className)}>{text}</button>;
};
