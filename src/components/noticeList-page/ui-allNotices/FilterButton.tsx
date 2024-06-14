import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './AllNotices.module.scss';
import Filter, { FilterData } from '../ui-filter/Filter';

const cx = classNames.bind(styles);

export default function FilterButton({ onApply }: { onApply: (filterData: FilterData) => void }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button type="button" className={cx('filter')} onClick={toggleFilter}>
        상세 필터
      </button>
      {isOpen && <Filter onClose={toggleFilter} isOpen={false} onApply={onApply} />}
      {/* isOpen이 true인 경우에만 Filter를 렌더링합니다. */}
    </>
  );
}
