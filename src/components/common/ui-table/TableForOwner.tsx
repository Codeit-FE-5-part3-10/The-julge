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

export const TableForOwner: TableType = ({ applications }) => {
  return (
    <table className={cx("table")}>
      <thead>
        <tr>
          <th>신청자</th>
          <th>소개</th>
          <th>전화번호</th>
          <th>상태</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((application: any, index) => (
          <tr key={index}>
            <td>{application.item.user.item.name ?? "."}</td>
            <td>{application.item.user.item.bio ?? "."}</td>
            <td>{application.item.user.item.phone ?? "."}</td>
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
