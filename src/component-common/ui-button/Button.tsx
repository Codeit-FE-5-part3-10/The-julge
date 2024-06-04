import React from "react";
import styles from "./Button.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

interface ButtonProps {
  size: string;
  color: string;
  width?: number;
  onClick?: () => void;
  children: React.PropsWithChildren<string>;
}

type ButtonType = React.FC<ButtonProps>;

export const Button: ButtonType = ({
  size,
  color,
  width,
  onClick,
  children,
}) => {
  const classNames = {
    [styles.large]: size === "large",
    [styles.medium]: size === "medium",
    [styles.small]: size === "small",
    [styles.primary]: color === "primary",
    [styles.white]: color === "white",
    [styles.gray]: color === "gray",
  };

  return (
    <button
      className={cx("button", classNames)}
      style={{ width: width }}
      disabled={color === "gray"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
