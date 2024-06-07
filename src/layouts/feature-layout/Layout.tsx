import classNames from "classnames/bind";
import styles from "./Layout.module.scss";
import NavigationBar from "@/src/components/common/navigationBar/NavigationBar";
import { ReactNode, RefObject } from "react";
import { Footer } from "@/src/components/common/ui-footer/Footer";

const cx = classNames.bind(styles);

type LayoutProps = {
  children: ReactNode;
  isSticky?: boolean;
  footerRef?: RefObject<HTMLElement>;
};

export const Layout = ({
  children,
  isSticky = true,
  footerRef,
}: LayoutProps) => {
  return (
    <div>
      <NavigationBar isSticky={isSticky} />
      <main className={cx("main")}>{children}</main>
      <Footer />
    </div>
  );
};
