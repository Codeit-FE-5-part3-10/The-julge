import classNames from 'classnames/bind';
import { ReactNode } from 'react';
import { Footer } from '@/src/components/common/ui-footer/Footer';
import styles from './Layout.module.scss';
import NavigationBar from '@/src/components/common/feature-navigation-bar/NavigationBar';

const cx = classNames.bind(styles);

type LayoutProps = {
  children: ReactNode;
  isSticky?: boolean;
  isFooterHidden?: boolean;
};

export const Layout = ({ children, isSticky = true, isFooterHidden }: LayoutProps) => (
  <div>
    <NavigationBar isSticky={isSticky} />
    <main className={cx('main', { long: isFooterHidden })}>{children}</main>
    <Footer isFooterHidden={isFooterHidden} />
  </div>
);
