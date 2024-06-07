import classNames from 'classnames/bind';
import React from 'react';
import styles from './ListNotice.module.scss';
import { CardNotice } from '../ui-card-notice/CardNotice';

const cx = classNames.bind(styles);

export const ListNotice = () => (
  <div className={cx('container')}>
    <CardNotice />
    <CardNotice />
    <CardNotice />
    <CardNotice />
    <CardNotice />
    <CardNotice />
  </div>
);
