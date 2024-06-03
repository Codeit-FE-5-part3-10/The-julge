/*
사용방법
<Modal
  setModal={모달 setState}
  modalItems={
    아래 세개 중 해당되는 사항으로 기입해주세요.
    warning = 느낌표 아이콘 && 버튼 한개 
    success = 아이콘X && 버튼 한개 
    question = 체크 아이콘 && 버튼 두개
  }
  text={모달 안내문구}
  link={클릭시 이동 할 링크}
  btnText={버튼 두개인 경우 메인 컬러 버튼문구}
/>
*/

/*
Todo
-디버깅
-스타일(순서, classname styles? 확인필요 )
-버튼 컴포넌트? 스타일 넣으면 반영
*/

import "@styles/global.scss";
import styles from "./Modal.module.scss";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import questionIcon from "public/images/modal-question.svg";
import warningIcon from "public/images/modal-alert.svg";

interface ModalProps {
  setModal: (value: boolean) => void;
  modalItems: {
    content: string;
    modalType: "warning" | "success" | "question";
  };
  text?: string;
  link: string;
  btnText: string;
}

const Modal: React.FC<ModalProps> = ({ setModal, modalItems, text, link, btnText = "예" }) => {

  const closeModal = () => {
    setModal(false);
  };

  const getModalImg = () => {
    switch (modalItems.modalType) {
      case "success":
        return null;
      case "warning":
        return warningIcon;
      case "question":
        return questionIcon;
      default:
        return null;
    }
  };

  const getModalBtn = () => {
    switch (modalItems.modalType) {
      case "success":
        return (
          <Link href={link} passHref>
            <button className={styles.mainBtn}>확인</button>
          </Link>
        );
      case "warning":
        return (
          <button className={styles.modalClose} onClick={closeModal}>
            확인
          </button>
        );
      case "question":
        return (
          <>
            <button className={styles.modalClose} onClick={closeModal}>
              아니요
            </button>
            <Link href={link} passHref>
              <button className={styles.mainBtn}>{btnText}</button>
            </Link>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <section className={styles.modalBack} onClick={closeModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {getModalImg() && <Image src={getModalImg() || ""} alt="modalIcon" />}
        <div className={styles.modaltext}>{text}</div>
        {getModalBtn()}
      </div>
    </section>
  );
};

export default Modal;