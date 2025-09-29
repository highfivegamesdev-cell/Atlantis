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
import { Maze } from "@/scenes/scene1/puzzles/maze/Maze";
import { Riddle } from "@/scenes/scene1/puzzles/riddle/Riddle";
import { ShapeMatcher } from "@/scenes/scene1/puzzles/shapeMatcher/ShapeMatcher";
import { useEffect } from "react";
import { SceneWrapper } from "@/components/layout/SceneWrapper";

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
  const {
    isModalOpen: isMazeOpen,
    openModal: openMaze,
    closeModal: closeMaze,
  } = useModal();
  const {
    isModalOpen: isRiddleOpen,
    openModal: openRiddle,
    closeModal: closeRiddle,
  } = useModal();
  const {
    isModalOpen: isShapeMatcherOpen,
    openModal: openShapeMatcher,
    closeModal: closeShapeMatcher,
  } = useModal();

  const { solvedPuzzles } = state.context;
  const allPuzzlesSolved = puzzles.every((p) => solvedPuzzles[p.id]);

  useEffect(() => {
    send({
      type: GameEventTypes.solvePuzzle,
      puzzleId: Puzzles.maze.name,
      answer: Puzzles.maze.answer,
    });

    send({
      type: GameEventTypes.solvePuzzle,
      puzzleId: Puzzles.sudoku.name,
      answer: Puzzles.sudoku.answer,
    });

    send({
      type: GameEventTypes.solvePuzzle,
      puzzleId: Puzzles.riddle.name,
      answer: Puzzles.riddle.answer,
    });
  }, []);

  const background = allPuzzlesSolved
    ? "/images/scenes/scene1/scene1-completed.png"
    : "/images/scenes/scene1/scene1-background.png";
  // return (
  //           <button onClick={() => send({ type: GameEventTypes.next })}>
  //     Next scene
  //   </button>
  // )

  return (
    <SceneWrapper backgroundUrl={background}>
      <div className="w-full h-full relative">
        <PuzzleTrigger
          image={puzzleConfig.sudoku.thumbnail}
          alt="Open Sudoku"
          className="w-[40px] lg:w-[50px] xl:w-[60px] 2xl:w-[70px] top-[62%] right-[20%]"
          action={openSudoku}
        />

        <PuzzleTrigger
          image={puzzleConfig.maze.thumbnail}
          alt="Open Maze"
          className="w-[50px] lg:w-[65px] xl:w-[80px] 2xl:w-[95px] top-[62%] right-[79%]"
          action={openMaze}
        />

        <PuzzleTrigger
          image={puzzleConfig.riddle.thumbnail}
          alt="Open Riddle"
          className="w-[50px] lg:w-[65px] xl:w-[80px] 2xl:w-[95px] top-[77%] right-[66%]"
          action={openRiddle}
        />

        <PuzzleTrigger
          image={puzzleConfig.shapeMatcher.thumbnail}
          alt="Open Shape Matcher"
          className="w-[40px] lg:w-[50px] xl:w-[60px] 2xl:w-[80px] top-[69%] right-[36%]"
          action={openShapeMatcher}
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

        <PuzzleModal isPuzzleOpen={isMazeOpen} closePuzzle={closeMaze}>
          {solvedPuzzles[Puzzles.maze.name] ? (
            <PuzzleCompleted
              text={puzzleConfig.maze.summary}
              image={puzzleConfig.maze.image}
              close={closeMaze}
            />
          ) : (
            <Maze close={closeMaze} />
          )}
        </PuzzleModal>

        <PuzzleModal isPuzzleOpen={isRiddleOpen} closePuzzle={closeRiddle}>
          {solvedPuzzles[Puzzles.riddle.name] ? (
            <PuzzleCompleted
              text={puzzleConfig.riddle.summary}
              image={puzzleConfig.riddle.image}
              close={closeRiddle}
            />
          ) : (
            <Riddle close={closeRiddle} />
          )}
        </PuzzleModal>

        <PuzzleModal
          isPuzzleOpen={isShapeMatcherOpen}
          closePuzzle={closeShapeMatcher}
        >
          {solvedPuzzles[Puzzles.shapeMatcher.name] ? (
            <PuzzleCompleted
              text={puzzleConfig.shapeMatcher.summary}
              close={closeShapeMatcher}
            />
          ) : (
            <ShapeMatcher close={closeShapeMatcher} />
          )}
        </PuzzleModal>
      </div>
    </SceneWrapper>
  );
};
