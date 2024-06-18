import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './CustomSelect.module.scss';

interface CustomSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  defaultOption?: string;
}

const cx = classNames.bind(styles);

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  defaultOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={cx('custom-select-wrapper')} ref={dropdownRef}>
      <div
        className={cx('custom-select')}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      >
        {value || defaultOption}
        <div className={cx('select-arrow', { open: isOpen })}></div>
      </div>
      {isOpen && (
        <div className={cx('select-options')}>
          {options.map((option, index) => (
            <div
              key={index}
              className={cx('select-option')}
              onClick={() => handleOptionClick(option)}
              onKeyDown={(e) => e.key === 'Enter' && handleOptionClick(option)}
              role="button"
              tabIndex={0}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
