import React from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

interface ButtonProps {
  text: string;
  color: 'primary' | 'white' | 'gray';
  width?: number;
  to?: string; // 클릭시 이동할 URL을 받을 prop
  onClick?: () => void; // 클릭 이벤트 핸들러 함수를 받을 prop
}

export const Button: React.FC<ButtonProps> = ({ text, color, width, to, onClick }) => {
  const className = cx('button', color, width);

  const handleClick = () => {
    // 만약 onClick prop이 주어졌다면 실행
    if (onClick) {
      onClick();
    }

    // 만약 to prop이 주어졌다면 URL로 이동
    if (to) {
      window.location.href = to;
    }
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {text}
    </button>
  );
};
