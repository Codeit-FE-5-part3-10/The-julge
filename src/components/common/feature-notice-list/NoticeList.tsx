import styles from "./NoticeList.module.scss";
import classNames from "classnames/bind";
import React from "react";
import { NoticeCard } from "../ui-notice-card/NoticeCard";

const cx = classNames.bind(styles);

export const NoticeList = () => {
  return (
    <div className={cx("container")}>
      <NoticeCard />
      <NoticeCard />
      <NoticeCard />
      <NoticeCard />
      <NoticeCard />
      <NoticeCard />
    </div>
  );
};
