import React, { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './CustomSelect.module.scss';

interface CustomSelectProps {
  options: string[];
  defaultOption?: string;
}

const cx = classNames.bind(styles);

export const CustomSelect: React.FC<CustomSelectProps> = ({ options, defaultOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={cx('custom-select-wrapper')} ref={dropdownRef}>
      <div className={cx('custom-select')} onClick={toggleDropdown}>
        {selectedOption}
        <div className={cx('select-arrow', { open: isOpen })}></div>
      </div>
      {isOpen && (
        <div className={cx('select-options')}>
          {options.map((option, index) => (
            <div
              key={index}
              className={cx('select-option')}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
