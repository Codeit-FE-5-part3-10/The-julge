// DropDown.tsx
import React, { ChangeEvent } from 'react';
import classNames from 'classnames/bind';
import styles from './AllNotices.module.scss';

const cx = classNames.bind(styles);

interface DropDownProps {
  onSelectSortOption: (option: 'time' | 'pay' | 'hour' | 'shop') => void; // 부모 컴포넌트에 선택한 정렬 옵션 전달하는 콜백 함수
  selectedOption: 'time' | 'pay' | 'hour' | 'shop'; // 부모 컴포넌트에서 전달된 선택된 정렬 옵션
}

export default function DropDown({ onSelectSortOption, selectedOption }: DropDownProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // onSelectSortOption(e.target.value as 'time' | 'pay' | 'hour' | 'shop'); // 선택한 옵션을 부모 컴포넌트에 전달
    const selectedValue = e.target.value as 'time' | 'pay' | 'hour' | 'shop';
    onSelectSortOption(selectedValue);
  };

  return (
    <select className={cx('dropDown')} id="dropdown" value={selectedOption} onChange={handleChange}>
      <option value="time">마감임박순</option>
      <option value="pay">시급많은순</option>
      <option value="hour">시간적은순</option>
      <option value="shop">가나다순</option>
    </select>
  );
}
