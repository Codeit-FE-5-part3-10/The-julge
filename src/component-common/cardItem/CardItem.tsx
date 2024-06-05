import Image from "next/image";
import styles from "./cardItem.module.scss";
import testImg from "@/public/images/gom.png";
import groupIcon from "@/public/images/group.svg";
import locationIcon from "@/public/images/path11.svg";
import UpIcon from "./UpIcon";
import { useEffect, useState } from "react";
import { MIN_WAGE } from "@/src/util/constant";
import classNames from "classnames/bind";

export default function CardItem() {
  const cx = classNames.bind(styles);
  const wage = 10000; // 시급
  const formattedWage = wage.toLocaleString(); // 천 단위 쉼표 추가
  const difference = wage - MIN_WAGE;
  const n = Math.ceil((difference / MIN_WAGE) * 100); // 최저 임금과 시급 비교해서 나온 %값
  const upIcon = n <= 49 ? "#ff8d72" : "#ff4040";
  const [iconColor, setIconColor] = useState("#ff4040");
  const [textColor, setTextColor] = useState("#ff8d72");

  useEffect(() => {
    //업 아이콘 색상변경
    const updateColors = () => {
      if (window.matchMedia(`(min-width:768px)`).matches) {
        setIconColor("white");
        setTextColor("white");
      } else {
        setIconColor(upIcon);
        setTextColor(n >= 50 ? "#ff4040" : "#ff8d72");
      }
    };
    updateColors();

    // 창 크기 변경 이벤트 리스너 추가
    window.addEventListener("resize", updateColors);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", updateColors);
    };
  }, []);

  return (
    <div className={cx("container")}>
      <Image
        className={cx("img")}
        src={testImg}
        alt={"공고 이미지"}
        width={147}
        height={84}
      />
      <p className={cx("title")}>수리 에스프레소 맛집</p>
      <div className={cx("container_dateTime")}>
        <Image className={cx("groupIcon")} src={groupIcon} alt={"아이콘"} />
        <div className={cx("container_text")}>
          <p className={cx("date")}>2023-01-03</p>
          <p className={cx("time")}>15:00~18:00 (n시간)</p>
        </div>
      </div>
      <div className={cx("container_location")}>
        <Image
          className={cx("locationIcon")}
          src={locationIcon}
          alt={"위치 아이콘"}
        />
        <p className={cx("location")}>서울시 송파구</p>
      </div>
      <div className={cx("container_pay")}>
        <p className={cx("wage")}>{formattedWage}원</p>
        <div className={cx("container_compare")}>
          <p className={cx("compare")} style={{ color: textColor }}>
            기존 시급보다 {n}%
          </p>
          <UpIcon color={iconColor} />
        </div>
      </div>
    </div>
  );
}
