import styles from "./Layout.module.scss";
import classNames from "classnames/bind";
import React, { PropsWithChildren } from "react";

const cx = classNames.bind(styles);

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>;
};
