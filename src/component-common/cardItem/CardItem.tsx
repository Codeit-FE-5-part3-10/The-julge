import Image from "next/image";
import styles from "./cardItem.module.scss";
import testImg from "@/public/images/gom.png";
import groupIcon from "@/public/images/group.svg";
import locationIcon from "@/public/images/path11.svg";
import up49 from "@/public/images/up49.svg";
import up50 from "@/public/images/up50.svg";
import UpIcon from "./UpIcon";
import { useEffect, useState } from "react";

export default function CardItem() {
  const n = 50;
  const wage = "10,000";
  const upIcon = n <= 49 ? up49 : up50;
  const [iconColor, setIconColor] = useState("#ff4040");

  useEffect(() => {
    //업 아이콘 색상변경
    const updateIconColor = () => {
      if (window.matchMedia(`(min-width:768px)`).matches) {
        setIconColor("white");
      } else {
        setIconColor("#ff4040");
      }
    };
    updateIconColor();

    // 창 크기 변경 이벤트 리스너 추가
    window.addEventListener("resize", updateIconColor);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", updateIconColor);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Image
        className={styles.img}
        src={testImg}
        alt={"공고 이미지"}
        width={147}
        height={84}
      />
      <p className={styles.title}>수리 에스프레소 맛집</p>
      <div className={styles.container_dateTime}>
        <Image className={styles.groupIcon} src={groupIcon} alt={"아이콘"} />
        <div className={styles.container_text}>
          <p className={styles.date}>2023-01-03</p>
          <p className={styles.time}>15:00~18:00 (n시간)</p>
        </div>
      </div>
      <div className={styles.container_location}>
        <Image
          className={styles.locationIcon}
          src={locationIcon}
          alt={"위치 아이콘"}
        />
        <p className={styles.location}>서울시 송파구</p>
      </div>
      <div className={styles.container_pay}>
        <p className={styles.wage}>{wage}원</p>
        <div className={styles.container_compare}>
          <p className={styles.compare}>기존 시급보다 {n}%</p>
          <UpIcon color={iconColor} />
        </div>
      </div>
    </div>
  );
}
