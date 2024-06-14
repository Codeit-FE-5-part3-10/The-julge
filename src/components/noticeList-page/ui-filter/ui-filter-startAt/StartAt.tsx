import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
// import { DateInput } from '@mantine/dates';
import styles from './StartAt.module.scss';
import formatDateTimeWithDateFns from '@/src/utils/formatDateTime';

const cx = classNames.bind(styles);

interface StartAtProps {
  selectedDate: string;
  onDateChage: (date: string) => void;
}

export default function StartAt({ onDateChage, selectedDate }: StartAtProps) {
  const [selectDate, setSelectDate] = useState<string>('');

  const handleDateChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateString = e.target.value;
    const date = new Date(dateString);
    const { formattedDate } = formatDateTimeWithDateFns(date.toString()); // 수정된 부분
    setSelectDate(formattedDate);
    onDateChage(formattedDate);
  };

  useEffect(() => {
    setSelectDate(selectedDate);
  }, [selectedDate]);

  const currentDate = new Date().toISOString().split('T')[0]; // 현재 날짜 가져오기

  return (
    <div className={cx('container')}>
      <p className={cx('title')}>시작일</p>
      {/* <DateInput
        label="Input label"
        description="Input description"
        placeholder="Input placeholder"
      /> */}
      <input
        className={cx('datePicker')}
        type="date"
        value={selectDate}
        onChange={handleDateChage}
        min={currentDate} // 최소 선택 가능한 날짜 설정
      />
    </div>
  );
}
