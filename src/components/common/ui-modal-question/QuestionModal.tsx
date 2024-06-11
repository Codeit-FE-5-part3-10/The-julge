import React from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import questionIcon from 'public/images/modal-question.svg';
import styles from './QuestionModal.module.scss';
import { Button } from '../ui-button/Button';

const cx = classNames.bind(styles);

interface ModalProps {
  isOpen: boolean;
  modalText: string;
  onCloseClick: () => void;
}

export const QuestionModal: React.FC<ModalProps> = ({
  isOpen = false,
  modalText,
  onCloseClick,
}) => {
  if (!isOpen) {
    return null;
  }

  // 모달 배경 클릭 시에만 이벤트가 일어나게 수정
  const handleBackdropClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    onCloseClick();
  };
  // ESC 누를 때에도 닫히게
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'escape') {
      onCloseClick();
    }
  };

  return (
    <div
      className={cx('backdrop')}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="presentation"
      aria-label="Close modal"
    >
      <div className={cx('container')}>
        <Image width={24} height={24} src={questionIcon} alt="modal icon" className={cx('icon')} />
        <div className={cx('text')}>{modalText}</div>
        <div className={cx('box')}>
          <Button color="white" width="80px" onClick={onCloseClick}>
            아니요
          </Button>
          <Button color="primary" width="80px" onClick={() => {}}>
            예
          </Button>
        </div>
      </div>
    </div>
  );
};
