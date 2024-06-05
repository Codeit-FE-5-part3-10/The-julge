import styles from "./ShopLayout.module.scss";
import classNames from "classnames/bind";
import React from "react";

const cx = classNames.bind(styles);

type ShopLayoutProps = Record<string, React.ComponentType>;

export const ShopLayout: React.FC<ShopLayoutProps> = ({ profile, list }) => {
  return (
    <div className={cx()}>
      <div className={cx()}>
        <div className={cx()}>
          <h1 className={cx()}></h1>
        </div>
      </div>
      <div className={cx()}>
        <div className={cx()}>
          <h1 className={cx()}></h1>
        </div>
      </div>
    </div>
  );
};
