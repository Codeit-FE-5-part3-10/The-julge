import React from 'react';
import classNames from 'classnames/bind';
import styles from './Section.module.scss';

const cx = classNames.bind(styles);

type SectionProps = {
  title: string;
  content: React.ReactNode;
  gray?: boolean;
  bottom?: boolean;
};

export const Section: React.FC<SectionProps> = ({ title, content, gray, bottom }) => (
  <div className={cx('wrapper', { gray }, { bottom })}>
    <div className={cx('container')}>
      <h1 className={cx('title')}>{title}</h1>
      {content}
    </div>
  </div>
);
