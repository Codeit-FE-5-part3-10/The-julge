import React from 'react';
import classNames from 'classnames/bind';
import styles from './Section.module.scss';

const cx = classNames.bind(styles);

type SectionProps = {
  children: React.ReactNode;
  gray?: boolean;
};

export const Section: React.FC<SectionProps> = ({ children, gray }) => (
  <div className={cx('wrapper', { gray })}>{children}</div>
);
