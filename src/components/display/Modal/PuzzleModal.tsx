import type { PropsWithChildren } from "react";
import Modal from "react-modal";

type Props = {
  isPuzzleOpen: boolean;
  closePuzzle: () => void;
};

export const PuzzleModal = ({
  children,
  isPuzzleOpen,
  closePuzzle,
}: PropsWithChildren<Props>) => {
  return (
    <Modal
      isOpen={isPuzzleOpen}
      onRequestClose={closePuzzle}
      className="relative overflow-auto max-w-full max-h-full rounded-lg"
      overlayClassName="fixed inset-0 bg-white/50 flex items-center justify-center"
      shouldCloseOnOverlayClick={false}
    >
      {children}
    </Modal>
  );
};
