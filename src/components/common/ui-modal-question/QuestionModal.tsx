import React from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import questionIcon from 'public/images/modal-question.svg';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import styles from './QuestionModal.module.scss';
import { Button } from '../ui-button/Button';
import { useModal } from '@/src/contexts/ModalContext';
import { putShopNoticeApplicationStatus } from '@/src/apis/applications';
import { useToken } from '@/src/utils/TokenProvider';

const cx = classNames.bind(styles);

type Status = 'accepted' | 'rejected' | 'canceled';

interface ModalProps {
  isOpen: boolean;
  modalText: string;
  targetStatus: Status;
}

export const QuestionModal: React.FC<ModalProps> = ({
  isOpen = false,
  modalText,
  targetStatus,
}) => {
  const { token } = useToken();
  const { shopId, noticeId, applicationId, closeModal } = useModal();
  const queryClient = useQueryClient();

  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    closeModal();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  const mutation = useMutation({
    mutationFn: (newStatus: Status) => {
      if (
        typeof shopId === 'string' &&
        typeof noticeId === 'string' &&
        typeof applicationId === 'string' &&
        typeof token === 'string'
      ) {
        return putShopNoticeApplicationStatus(shopId, noticeId, applicationId, newStatus, token);
      }
      return Promise.reject(new Error('Invalid ID type'));
    },
    onSuccess: () => {
      if (typeof shopId === 'string' && typeof noticeId === 'string') {
        const queryFilter = ['shopNoticeApplications', shopId, noticeId] as any;
        queryClient.invalidateQueries(queryFilter);
      }
      closeModal();
    },
  });

  const handleUpdate = (newStatus: Status) => {
    mutation.mutate(newStatus);
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
          <Button color="white" width="80px" onClick={closeModal}>
            아니요
          </Button>
          <Button
            color="primary"
            width="80px"
            onClick={() => {
              handleUpdate(targetStatus);
            }}
          >
            예
          </Button>
        </div>
      </div>
    </div>
  );
};
