import { usePagination } from "@mantine/hooks";
import { image } from "./constant";
import Image from "next/image";

import classNames from "classnames/bind";
import styles from "./Pagination.module.scss";

const cx = classNames.bind(styles);

interface PaginationParams {
  initialPage?: number;
  page?: number;
  total: number;
  siblings?: number;
  boundaries?: number;
  onChange?: (page: number) => void;
}

export const Pagination = (params: PaginationParams) => {
  const pagination = usePagination({ ...params });

  const handleChange = (pageNumber: any) => {
    if (pageNumber === "dots") {
      return;
    }
    pagination.setPage(pageNumber);
  };

  return (
    <div className={cx("container")}>
      <button className={cx("arrow")} onClick={pagination.previous}>
        <Image
          width={20}
          height={20}
          src={
            pagination.active === 1 ? image.leftGray.src : image.leftBlack.src
          }
          alt={
            pagination.active === 1 ? image.leftGray.alt : image.leftBlack.alt
          }
        />
      </button>
      <div className={cx("numbers")}>
        {pagination.range.map((pageNumber, index) => (
          <button
            key={index}
            className={cx("number", {
              active: pageNumber === pagination.active,
            })}
            onClick={() => {
              handleChange(pageNumber);
            }}
          >
            {typeof pageNumber === "number" ? pageNumber : "..."}
          </button>
        ))}
      </div>

      <button className={cx("arrow")} onClick={pagination.next}>
        <Image
          width={20}
          height={20}
          src={
            pagination.active === params.total
              ? image.rightGray.src
              : image.rightBlack.src
          }
          alt={
            pagination.active === params.total
              ? image.rightGray.alt
              : image.rightBlack.alt
          }
        />
      </button>
    </div>
  );
};
