import type { Puzzle } from "@/scenes/config/scenesConfig";
import { GameEventTypes } from "@/scenes/config/gameMachine";
import { useModal } from "@/lib/hooks/useModal";
import { Sudoku } from "@/scenes/scene1/puzzles/sudoku/Sudoku";
import {
  initialGrid,
  solutionGrid,
} from "@/scenes/scene1/puzzles/sudoku/config";
import { useGame } from "@/scenes/config/useGame";
import { PuzzleCompleted } from "@/components/display/PuzzleCompleted/PuzzleCompleted";
import { Puzzles } from "@/scenes/config/scenesConfig";
import { puzzleConfig } from "@/scenes/scene1/config";
import { PuzzleModal } from "@/components/display/Modal/PuzzleModal";
import { PuzzleTrigger } from "@/components/action/Button/PuzzleTrigger";

type Props = {
  puzzles: Puzzle[];
};

export const Scene1 = ({ puzzles }: Props) => {
  const { state, send } = useGame();
  const {
    isModalOpen: isSudokuOpen,
    openModal: openSudoku,
    closeModal: closeSudoku,
  } = useModal();

  const { solvedPuzzles } = state.context;
  const allPuzzlesSolved = puzzles.every((p) => solvedPuzzles[p.id]);

  return (
    <div className="w-full h-full relative">
      {allPuzzlesSolved && (
        <button onClick={() => send({ type: GameEventTypes.next })}>
          Next scene
        </button>
      )}

      <PuzzleTrigger
        image={puzzleConfig.sudoku.thumbnail}
        alt="Open Sudoku"
        positionTop="62%"
        positionRight="10%"
        action={openSudoku}
      />

      <PuzzleModal isPuzzleOpen={isSudokuOpen} closePuzzle={closeSudoku}>
        {solvedPuzzles[Puzzles.sudoku.name] ? (
          <PuzzleCompleted
            text={puzzleConfig.sudoku.summary}
            image={puzzleConfig.sudoku.image}
            close={closeSudoku}
          />
        ) : (
          <Sudoku
            initialGrid={initialGrid}
            solutionGrid={solutionGrid}
            close={closeSudoku}
          />
        )}
      </PuzzleModal>
    </div>
  );
};
