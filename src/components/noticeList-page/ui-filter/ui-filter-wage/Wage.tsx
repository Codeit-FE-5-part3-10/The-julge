import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Wage.module.scss';

const cx = classNames.bind(styles);

interface WageProps {
  wage: number;
  onWageChange: (wage: number) => void;
}

export default function Wage({ wage, onWageChange }: WageProps) {
  const [inputData, setInputData] = useState<number>(0); // 초기값을 빈 문자열로 설정

  useEffect(() => {
    setInputData(wage);
  }, [wage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numberValue = parseInt(value, 10); // 숫자로 변환
    setInputData(numberValue);
    onWageChange(numberValue);
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
          />
          <span className={cx('text-won')}>원</span>
        </div>
        <span>이상부터</span>
      </div>
    </div>
  );
}
