import React from 'react';
import classNames from 'classnames/bind';
import styles from './ShopLayout.module.scss';
import { Section } from '@/src/components/common/ui-section/Section';

const cx = classNames.bind(styles);

type ShopLayoutProps = Record<'detail' | 'list', React.ReactNode>;

export const ShopLayout: React.FC<ShopLayoutProps> = ({ detail, list }) => (
  <>
    <Section>
      <div className={cx('container')}>
        <h1 className={cx('title')}>내 가게</h1>
        {detail}
      </div>
    </Section>
    <Section gray>
      <div className={cx('container')}>
        <h1 className={cx('title')}>등록한 공고</h1>
        {list}
      </div>
    </Section>
  </>
);
