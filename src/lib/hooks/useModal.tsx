import { useState } from "react";

type useModalOutput = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useModal = (): useModalOutput => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};
