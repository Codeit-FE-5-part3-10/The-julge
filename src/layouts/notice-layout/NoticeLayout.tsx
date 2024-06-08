import React from 'react';
import classNames from 'classnames/bind';
import styles from './NoticeLayout.module.scss';
import { Section } from '@/src/components/common/ui-section/Section';

const cx = classNames.bind(styles);

type NoticeLayoutProps = Record<'profile' | 'list', React.ReactNode>;

export const NoticeLayout: React.FC<NoticeLayoutProps> = ({ profile, list }) => (
  <>
    <Section>
      <div className={cx('container')}>
        <h1 className={cx('title')}>ex.도토리 식당</h1>
        {profile}
      </div>
    </Section>
    <Section>
      <div className={cx('container')}>
        <h1 className={cx('title')}>신청자 목록</h1>
        {list}
      </div>
    </Section>
  </>
);
