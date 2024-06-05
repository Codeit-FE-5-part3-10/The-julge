import { items } from "@/types/types";
import { TableButton } from "../ui-table-button/TableButton";
import styles from "./Table.module.scss";
import classNames from "classnames/bind";
import React from "react";

const cx = classNames.bind(styles);

interface TableProps {
  applications: items;
}

type TableType = React.FC<TableProps>;

export const TableForUser: TableType = ({ applications }) => {
  return (
    <table className={cx("table")}>
      <thead>
        <tr>
          <th>가게</th>
          <th>일자</th>
          <th>시급</th>
          <th>상태</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((application: any, index) => (
          <tr key={index}>
            <td>{application.item.shop.item.name ?? "."}</td>
            <td>{application.item.notice.item.workhour ?? "."}</td>
            <td>{application.item.notice.item.hourlyPay ?? "."}</td>
            <td>
              <TableButton status={application.item.status} />{" "}
              {/* TODO: status pending 일 때, 사장과 알바 각각 '거절하기'와 '승인하기' 버튼 & '취소하기' 버튼 */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
