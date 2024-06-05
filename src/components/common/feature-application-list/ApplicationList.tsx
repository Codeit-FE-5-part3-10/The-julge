import React, { useEffect, useState } from "react";
import { Pagination } from "../ui-pagination/Pagination";
import { TableForOwner } from "../ui-table/TableForOwner";
import { TableForUser } from "../ui-table/TableForUser";
import styles from "./ApplicationList.module.scss";
import classNames from "classnames/bind";
import { items } from "@/src/types/types";
import {
  GetApplicationsByShopByNotice,
  GetApplicationsByUser,
} from "@/src/utils/getApplications";
const cx = classNames.bind(styles);

interface ApplicationListProps {
  isOwnerPage: boolean;
  initialPage: number;
  siblings: number;
  boundaries: number;
  countPerPage: number;
}

type ApplicationListType = React.FC<ApplicationListProps>;

export const ApplicationList: ApplicationListType = ({
  isOwnerPage,
  initialPage,
  siblings,
  boundaries,
  countPerPage,
}) => {
  const [page, setPage] = useState<number>(initialPage);
  const [applications, setApplications] = useState<items>([]);
  const [total, setTotal] = useState<number>(1);

  useEffect(() => {
    {
      isOwnerPage
        ? GetApplicationsByShopByNotice(
            setApplications,
            setTotal,
            page,
            countPerPage
          )
        : GetApplicationsByUser(setApplications, setTotal, page, countPerPage);
    }
  }, [page]);

  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        {isOwnerPage ? (
          <TableForOwner applications={applications} />
        ) : (
          <TableForUser applications={applications} />
        )}
        <Pagination
          initialPage={initialPage}
          page={page}
          siblings={siblings}
          boundaries={boundaries}
          total={total}
          onChange={setPage}
        />
      </div>
    </div>
  );
};
