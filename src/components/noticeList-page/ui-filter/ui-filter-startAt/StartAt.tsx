import classNames from 'classnames/bind';
import styles from './StartAt.module.scss';
import { useState } from 'react';
import formatDateTimeWithDateFns from '@/src/utils/formatDateTime';

const cx = classNames.bind(styles);

interface StartAtProps {
  onDateChage: (date: string) => void;
  setSelectedDate: (date: string) => void; // 부모 컴포넌트로부터 setSelectedDate 전달 받음
}

export default function StartAt({ onDateChage, setSelectedDate }: StartAtProps) {
  const [selectDate, setSelectDate] = useState<string>('');

  const handleDateChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateString = e.target.value;
    const date = new Date(dateString);
    const formattedDate = formatDateTimeWithDateFns(date.toString()).formattedDate; // 수정된 부분
    setSelectDate(formattedDate);
    onDateChage(formattedDate);
    setSelectedDate(formattedDate); // 상태 변경이 아닌 props를 통해 부모 컴포넌트로 전달
  };

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
