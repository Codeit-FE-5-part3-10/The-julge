// Button.tsx

import React from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

interface ButtonProps {
  children: React.ReactNode;
  color: 'primary' | 'white' | 'gray';
  type?: 'button' | 'submit';
  width?: number | string;
  to?: string;
  onClick?: () => void;
  disabled?: boolean;
  cursor?: 'pointer' | 'default' | 'none'; // cursor prop 추가
}

export const Button: React.FC<ButtonProps> = ({
  children,
  color,
<<<<<<< HEAD
  type = 'button',
  width,
  to,
  onClick,
=======
  width,
  to,
  onClick,
  disabled,
  cursor = 'pointer', // 기본값 'pointer' 설정
>>>>>>> develop
}) => {
  const className = cx('button', color);

  const handleClick = () => {
    if (onClick && !disabled) {
      onClick();
    }

    if (to && !disabled) {
      window.location.href = to;
    }
  };

  const buttonStyle = {
    width: width || '100%',
    cursor: disabled ? 'default' : cursor, // disabled일 때 cursor를 'default'로 설정
  };

  return (
<<<<<<< HEAD
    <button type={type} onClick={handleClick} className={className} style={buttonStyle}>
=======
    <button
      type="button"
      onClick={handleClick}
      className={className}
      style={buttonStyle}
      disabled={disabled}
    >
>>>>>>> develop
      {children}
    </button>
  );
};
