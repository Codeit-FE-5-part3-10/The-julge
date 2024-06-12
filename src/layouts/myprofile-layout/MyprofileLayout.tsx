import React from 'react';
import classNames from 'classnames/bind';
import styles from '@/src/layouts/myprofile-layout/MyprofileLayout.module.scss';

const cx = classNames.bind(styles);

type MyprofileLayoutProps = Record<'profile' | 'list', React.ReactNode>;

export const MyprofileLayout: React.FC<MyprofileLayoutProps> = ({ profile, list }) => (
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
