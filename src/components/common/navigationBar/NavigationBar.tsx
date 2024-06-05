import Logo from "@/public/images/global-logo.svg";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./NavigationBar.module.scss";
import Link from "next/link";
import { useState } from "react";
import SearchBarIcon from "@/public/images/navigationbar-search.svg";
import NotificationIcon from "@/public/images/navigationbar-empty.svg";
import NotificationIconNew from "@/public/images/navigationbar-new.svg";

export default function NavigationBar({}) {
  const cx = classNames.bind(styles);
  const [searchTerm, setSearchTerm] = useState("");
  const isLoggedIn = 0;

  return (
    <div className={cx("navBar")}>
      <div className={cx("logoButton_container")}>
        <div className={cx("logo_container")}>
          <Link href="/" className={cx("logo")}>
            <Image src={Logo} alt={""}></Image>
          </Link>
        </div>

        {/* Search */}
        <div className={cx("searchBar-container")}>
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

        {/* Buttons */}
        <div className={cx("buttons-container")}>
          {isLoggedIn ? (
            <>
              <Link href="/profile">내 프로필</Link>
              <Link href="/logout">로그아웃</Link>
              <Link href="/notifications">
                <Image src={NotificationIcon} alt={""}></Image>
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
    </div>
  );
}
