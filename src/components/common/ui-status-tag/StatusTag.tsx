// StatusTag.tsx
import classNames from 'classnames/bind';
import styles from './StatusTag.module.scss';
import { ModalProvider, useModal } from '@/src/contexts/ModalContext';
import { modalType } from '@/src/constants/constant';

const cx = classNames.bind(styles);

interface StatusTagProps {
  status: 'pending' | 'rejected' | 'accepted' | 'canceled';
  id: string;
}

export const StatusTag: React.FC<StatusTagProps> = ({ status, id }) => {
  const { openModal } = useModal();

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
      {/* TODO: 유저인 경우 '취소하기' 버튼 추가해야 함 */}
      {status === 'pending' ? (
        <div className={cx('box')}>
          <button
            type="button"
            onClick={() => openModal(modalType.decline, id)}
            className={cx('button', 'enabled', 'decline')}
          >
            거절하기
          </button>
          <button
            type="button"
            onClick={() => openModal(modalType.approve, id)}
            className={cx('button', 'enabled', 'approve')}
          >
            승인하기
          </button>
        </div>
      ) : (
        <button className={cx('button', 'disabled', className)} type="button" disabled>
          {text}
        </button>
      )}
    </div>
  );
};
