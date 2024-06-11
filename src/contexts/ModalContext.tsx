import React, { ReactNode, createContext, useContext, useState } from 'react';

interface ModalContextProps {
  currentModal: string | null;
  applicationId: string | null;
  openModal: (modal: string, id: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentModal, setCurrentModal] = useState<string | null>(null);
  const [applicationId, setApplicationId] = useState<string | null>(null);

  const openModal = (modal: string, id: string) => {
    setCurrentModal(modal);
    setApplicationId(id);
  };

  const closeModal = () => {
    setCurrentModal(null);
    setApplicationId(null);
  };

  return (
    <ModalContext.Provider value={{ currentModal, applicationId, openModal, closeModal }}>
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
