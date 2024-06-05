import { useEffect, useState } from "react";
import styles from "./Post.module.scss";
import classNames from "classnames/bind";
import Link from "next/link";

const cx = classNames.bind(styles);

interface PostProps {
  description: string;
  btnText: string;
  href: string;
}

export const Post: React.FC<PostProps> = ({ description, btnText, href }) => {
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

    // 컴포넌트가 마운트될 때 창 너비에 따라 버튼 사이즈를 설정
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 초기 값이 설정되기 전에는 아무것도 렌더링되지 않도록
  if (buttonSize === null || buttonWidth === null) {
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
