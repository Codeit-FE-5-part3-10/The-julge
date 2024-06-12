import classNames from 'classnames/bind';
import { ReactNode, RefObject } from 'react';
import { Footer } from '@/src/components/common/ui-footer/Footer';
import styles from './Layout.module.scss';
import NavigationBar from '@/src/components/common/navigationBar/NavigationBar';

const cx = classNames.bind(styles);

type LayoutProps = {
  children: ReactNode;
  isSticky?: boolean;
  footerRef?: RefObject<HTMLElement>;
};

export const Layout = ({ children, isSticky = true, footerRef }: LayoutProps) => (
  <div>
    <NavigationBar isSticky={isSticky} />
    <main className={cx('main')}>{children}</main>
    <Footer />
  </div>
);
