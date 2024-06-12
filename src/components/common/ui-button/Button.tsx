import React from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

interface ButtonProps {
  children: React.PropsWithChildren<string>;
  color: 'primary' | 'white' | 'gray';
  width?: number | string;
  to?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, color, width, to, onClick }) => {
  const className = cx('button', color);

  const handleClick = () => {
    //  안전성 검사 : 만약 prop이 제대로 주어졌다면 실행
    if (onClick) {
      onClick();
    }

    // 만약 to prop이 주어졌다면 URL로 이동
    if (to) {
      window.location.href = to;
    }
  };

  // width가 주어지지 않았을 때 기본값을 '100%'로 설정
  const buttonStyle = {
    width: width || '100%',
  };

  return (
    <button type="button" onClick={handleClick} className={className} style={buttonStyle}>
      {children}
    </button>
  );
};
