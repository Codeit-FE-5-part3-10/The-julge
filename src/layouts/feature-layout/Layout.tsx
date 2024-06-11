//TODO: footer, navigationbar 가로너비 화면 너비에 비례 ? or 고정값 ? 싱크를 맞춰볼까요? (의진)
import { Footer } from '@/src/components/common/ui-footer/Footer';
import classNames from 'classnames/bind';
import styles from './Layout.module.scss';
import { ReactNode, RefObject } from 'react';
import NavigationBar from '@/src/components/common/navigationBar/NavigationBar';

const cx = classNames.bind(styles);

type LayoutProps = {
  children: ReactNode;
  isSticky?: boolean;
  footerRef?: RefObject<HTMLElement>;
};

export const Layout = ({ children, isSticky = true, footerRef }: LayoutProps) => {
  return (
    <div>
      <NavigationBar isSticky={isSticky} />
      <main className={cx('main')}>{children}</main>
      <Footer />
    </div>
  );
};
