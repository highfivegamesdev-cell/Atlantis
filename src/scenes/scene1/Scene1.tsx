import Modal from "react-modal";

import type { Puzzle } from "@/scenes/config/scenesConfig";
import type { GameEvent } from "@/scenes/config/gameMachine";
import { GameEventTypes } from "@/scenes/config/gameMachine";
import { useModal } from "@/lib/hooks/useModal";
import { Sudoku } from "@/scenes/scene1/puzzles/sudoku/Sudoku";
import {
  initialGrid,
  solutionGrid,
} from "@/scenes/scene1/puzzles/sudoku/config";

type Props = {
  puzzles: Puzzle[];
  solvedPuzzles: Record<string, boolean>;
  send: (event: GameEvent) => void;
};

Modal.setAppElement("#root");

export const Scene1 = ({ puzzles, solvedPuzzles, send }: Props) => {
  const {
    isModalOpen: isSudokuOpen,
    openModal: openSudoku,
    closeModal: closeSudoku,
  } = useModal();
  // const allPuzzlesSolved = puzzles.every((p) => solvedPuzzles[p.id]);
  const allPuzzlesSolved = true;

  return (
    <div className="w-full h-full relative">
      <h1>Scene 1</h1>

      {allPuzzlesSolved && (
        <button onClick={() => send({ type: GameEventTypes.next })}>
          Next scene
        </button>
      )}

      <button className="absolute top-[70%] right-[10%]" onClick={openSudoku}>
        Open Modal
      </button>

      <Modal
        isOpen={isSudokuOpen}
        onRequestClose={closeSudoku}
        className="w-auto h-auto flex justify-center"
      >
        <Sudoku
          initialGrid={initialGrid}
          solutionGrid={solutionGrid}
          send={send}
          close={closeSudoku}
        />
      </Modal>
    </div>
  );
};
