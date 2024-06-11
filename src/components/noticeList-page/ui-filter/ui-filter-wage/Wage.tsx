import classNames from 'classnames/bind';
import styles from './Wage.module.scss';
import { useState } from 'react';
import { setWeek } from 'date-fns';

const cx = classNames.bind(styles);

interface WageProps {
  onWageChange: (wage: number) => void;
  setWage: (wage: number | undefined) => void; // 부모 컴포넌트로부터 setWage 전달 받음
}

export default function Wage({ onWageChange, setWage }: WageProps) {
  const [inputData, setInputData] = useState<number>(0); // 초기값을 빈 문자열로 설정

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numberValue = parseInt(value, 10); // 숫자로 변환
    setInputData(numberValue);
    onWageChange(numberValue);
    setWage(numberValue);
  };

  return (
    <div className={cx('container')}>
      <p className={cx('title')}>금액</p>
      <div className={cx('input-container')}>
        <div className={cx('input-text-wrapper')}>
          <input
            className={cx('input')}
            type="number"
            value={inputData === 0 ? '' : inputData} // 초기값이 0일 때는 빈 문자열로 표시
            placeholder="입력"
            onChange={handleChange}
          ></input>
          <span className={cx('text-won')}>원</span>
        </div>
        <span>이상부터</span>
      </div>
    </div>
  );
}
