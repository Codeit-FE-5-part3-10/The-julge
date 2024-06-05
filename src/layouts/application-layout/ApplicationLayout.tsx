import styles from "./ApplicationLayout.module.scss";
import classNames from "classnames/bind";
import React from "react";

const cx = classNames.bind(styles);

type ApplicationLayoutProps = Record<"profile" | "list", React.ReactNode>;

export const ApplicationLayout: React.FC<ApplicationLayoutProps> = ({
  profile,
  list,
}) => {
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <h1 className={cx("title")}>ex.도토리 식당</h1>
          {profile}
        </div>
      </div>
      <div className={cx("wrapper", "list")}>
        <div className={cx("container")}>
          <h1 className={cx("title")}>신청자 목록</h1>
          {list}
        </div>
      </div>
    </>
  );
};
