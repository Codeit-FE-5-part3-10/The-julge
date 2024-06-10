import classNames from 'classnames/bind';
import styles from './AllNotices.module.scss';
import { useState } from 'react';
import Filter from '../ui-filter/Filter';

const cx = classNames.bind(styles);

export default function FilterButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className={cx('filter')} onClick={toggleFilter}>
        상세 필터
      </button>
      {isOpen && <Filter onClose={toggleFilter} />}{' '}
      {/* isOpen이 true인 경우에만 Filter를 렌더링합니다. */}
    </>
  );
}
