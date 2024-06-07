import classNames from 'classnames/bind';
import React from 'react';
import styles from './NoticeList.module.scss';
import { NoticeCard } from '../ui-notice-card/NoticeCard';

const cx = classNames.bind(styles);

export const NoticeList = () => (
  <div className={cx('container')}>
    <NoticeCard />
    <NoticeCard />
    <NoticeCard />
    <NoticeCard />
    <NoticeCard />
    <NoticeCard />
  </div>
);
