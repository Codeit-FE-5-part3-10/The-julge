import styles from "./Post.module.scss";
import classNames from "classnames/bind";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const cx = classNames.bind(styles);

interface PostProps {
  description: string;
  btnText: string;
  href: string;
}

const Post: React.FC<PostProps> = ({ description, btnText, href }) => {
  const [buttonSize, setButtonSize] = useState<string | null>(null);
  const [buttonWidth, setButtonWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setButtonSize("small");
        setButtonWidth(108);
      } else {
        setButtonSize("large");
        setButtonWidth(346);
      }
    };

    // 컴포넌트가 처음 마운트될 때 사이즈를 설정합니다.
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (buttonSize === null || buttonWidth === null) {
    // 초기 값이 설정되기 전에는 아무 것도 렌더링하지 않습니다.
    return null;
  }

  const className = cx("button", "primary", buttonSize);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <h1 className={cx("description")}>{description}</h1>
        <Link href={href}>
          <button className={className} style={{ width: buttonWidth }}>
            {btnText}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Post;
