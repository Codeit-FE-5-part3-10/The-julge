import classNames from 'classnames/bind';
import styles from './StartAt.module.scss';
import { useEffect, useState } from 'react';
import formatDateTimeWithDateFns from '@/src/utils/formatDateTime';

const cx = classNames.bind(styles);

interface StartAtProps {
  selectedDate: any;
  onDateChage: (date: string) => void;
}

export default function StartAt({ onDateChage, selectedDate }: StartAtProps) {
  const [selectDate, setSelectDate] = useState<string>('');

  const handleDateChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateString = e.target.value;
    const date = new Date(dateString);
    const formattedDate = formatDateTimeWithDateFns(date.toString()).formattedDate; // 수정된 부분
    setSelectDate(formattedDate);
    onDateChage(formattedDate);
  };

  useEffect(() => {
    setSelectDate(selectedDate);
  }, [selectedDate]);

  return (
    <div className={cx('container')}>
      <p className={cx('title')}>시작일</p>
      <input
        className={cx('datePicker')}
        type="date"
        value={selectDate}
        onChange={handleDateChage}
      />
    </div>
  );
}
