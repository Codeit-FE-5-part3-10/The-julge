//TODO: 새로 바꾼 버튼 컴포넌트 적용

/*
사용방법

modalType 아래 세개 중 해당되는 사항으로 기입해주세요.
warning = 느낌표 아이콘 && 버튼 한개 
success = 아이콘X && 버튼 한개 
question = 체크 아이콘 && 버튼 두개

예시) 

interface ModalItems {
  content: string;
  modalType: "warning" | "success" | "question";
  link: string;
  btnText: string;
}

  const [isModalOpen, setModalOpen] = useState<ModalItems | null>(null);

  const showModal = () => {
    setModalOpen({
      content: "모달 안내문구",
      modalType: "success",
      link: "https://naver.com"
      btnText: "question에서 메인컬러 버튼 Text",
    });
  };

  <button onClick={showModal} className="ToolBtn">
    버튼
  </button>
  {isModalOpen && (
    <Modal
      setModal={setModalOpen}
      modalItems={isModalOpen}
      content={isModalOpen.content}
      link={isModalOpen.link}
      btnText={isModalOpen.btnText}
    />
  )}

*/

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import questionIcon from 'public/images/modal-question.svg';
import warningIcon from 'public/images/modal-alert.svg';

const cx = classNames.bind(styles);
interface ModalProps {
  setModal: (value: ModalItems | null) => void;
  modalItems: {
    content: string;
    modalType: 'warning' | 'success' | 'question';
  };
  content?: string;
  link: string;
  btnText: string;
}

const Modal: React.FC<ModalProps> = ({ setModal, modalItems, content, link, btnText = '예' }) => {
  const closeModal = () => {
    setModal(null);
  };

  const getModalImg = () => {
    switch (modalItems.modalType) {
      case 'success':
        return null;
      case 'warning':
        return warningIcon;
      case 'question':
        return questionIcon;
      default:
        return null;
    }
  };

  const getModalBtn = () => {
    switch (modalItems.modalType) {
      case 'success':
        return (
          <Link href={link} passHref>
            <button className={cx('mainBtn')}>확인</button>
          </Link>
        );
      case 'warning':
        return (
          <button className={cx('modalClose')} onClick={closeModal}>
            확인
          </button>
        );
      case 'question':
        return (
          <>
            <button className={cx('modalClose')} onClick={closeModal}>
              아니요
            </button>
            <Link href={link} passHref>
              <button className={cx('mainBtn')}>{btnText}</button>
            </Link>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <section className={cx('modalBack')} onClick={closeModal}>
      <div className={cx('modal')} onClick={(e) => e.stopPropagation()}>
        <div className={cx('modalwrap')}>
          {getModalImg() && <Image src={getModalImg() || ''} alt="modalIcon" />}
          <div className={cx('modaltext')}>{content}</div>
          {getModalBtn()}
        </div>
      </div>
    </section>
  );
};

export default Modal;
