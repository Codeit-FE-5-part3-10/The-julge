import Logo from "@/public/images/global-logo.svg";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./NavigationBar.module.scss";
import Link from "next/link";
import { useState, useEffect } from "react";
import SearchBarIcon from "@/public/images/navigationbar-search.svg";
import NotificationIcon from "@/public/images/navigationbar-empty.svg";
import NotificationIconNew from "@/public/images/navigationbar-new.svg";

type NavigationBarProps = {
  isSticky: boolean;
};

export default function NavigationBar({ isSticky }: NavigationBarProps) {
  const cx = classNames.bind(styles);
  const [searchTerm, setSearchTerm] = useState("");
  const [isTablet, setIsTablet] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth >= 768); // 예시로 768px 이상을 테블릿으로 설정
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 초기 로드 시 크기 체크

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={cx("navBar", { sticky: isSticky })}>
      <div className={cx("logoButton_container")}>
        <div className={cx("logo_container")}>
          <Link href="/" className={cx("logo")}>
            <Image src={Logo} alt="로고"></Image>
          </Link>
        </div>

        {isTablet && (
          <div className={cx("searchBar-container-tablet")}>
            <input
              className={cx("searchBar")}
              type="text"
              placeholder="가게 이름으로 찾아보세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Image
              className={cx("searchBarIcon")}
              src={SearchBarIcon}
              alt="검색 아이콘"
            />
          </div>
        )}

        <div className={cx("buttons-container")}>
          {isLoggedIn ? (
            <>
              <Link href="/profile">내 프로필</Link>
              <Link href="/logout">로그아웃</Link>
              <Link href="/notifications">
                <Image src={NotificationIcon} alt="알림 아이콘"></Image>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">로그인</Link>
              <Link href="/signup">회원가입</Link>
            </>
          )}
        </div>
      </div>

      {!isTablet && (
        <div className={cx("searchBar-container-mobile")}>
          <input
            className={cx("searchBar")}
            type="text"
            placeholder="가게 이름으로 찾아보세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Image
            className={cx("searchBarIcon")}
            src={SearchBarIcon}
            alt="검색 아이콘"
          />
        </div>
      )}
    </div>
  );
}
