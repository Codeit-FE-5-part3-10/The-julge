import classNames from 'classnames/bind';
import { ReactNode, RefObject } from 'react';
import { Footer } from '@/src/components/common/ui-footer/Footer';
import styles from './Layout.module.scss';
import NavigationBar from '@/src/components/common/feature-navigation-bar/NavigationBar';

const cx = classNames.bind(styles);

type LayoutProps = {
  children: ReactNode;
  isSticky?: boolean;
  footerRef?: RefObject<HTMLElement>;
};

export const Layout = ({ children, footerRef }: LayoutProps) => (
  <div>
    <NavigationBar />
    <main className={cx('main')}>{children}</main>
    <Footer />
  </div>
);
