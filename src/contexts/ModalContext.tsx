import { useRouter } from 'next/router';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface ModalContextProps {
  currentModal: string | null;
  shopId: string | string[] | undefined;
  noticeId: string | string[] | undefined;
  applicationId: string | null;
  openModal: (modal: string, id: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentModal, setCurrentModal] = useState<string | null>(null);
  const [shopId, setShopId] = useState<string | string[] | undefined>();
  const [noticeId, setNoticeId] = useState<string | string[] | undefined>();
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const { shop_id, notice_id } = router.query;
    setShopId(shop_id);
    setNoticeId(notice_id);
  }, [router.query]);

  const openModal = (modal: string, id: string) => {
    setCurrentModal(modal);
    setApplicationId(id);
  };

  const closeModal = () => {
    setCurrentModal(null);
    setApplicationId(null);
  };

  return (
    <ModalContext.Provider
      value={{ currentModal, shopId, noticeId, applicationId, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
