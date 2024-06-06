import React from 'react';
import classNames from 'classnames/bind';
import styles from './ShopLayout.module.scss';

const cx = classNames.bind(styles);

type ShopLayoutProps = Record<'profile' | 'list', React.ReactNode>;

export const ShopLayout: React.FC<ShopLayoutProps> = ({ profile, list }) => (
  <>
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <h1 className={cx('title')}>내 가게</h1>
        {profile}
      </div>
    </div>
    <div className={cx('wrapper', 'list')}>
      <div className={cx('container')}>
        <h1 className={cx('title')}>등록한 공고</h1>
        {list}
      </div>
    </div>
  </>
);
