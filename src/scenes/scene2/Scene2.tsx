import type { Puzzle } from "@/scenes/config/scenesConfig";
import { useModal } from "@/lib/hooks/useModal";
import { useGame } from "@/scenes/config/useGame";
import { PuzzleCompleted } from "@/components/display/PuzzleCompleted/PuzzleCompleted";
import { Puzzles } from "@/scenes/config/scenesConfig";
import { puzzleConfig } from "@/scenes/scene2/config";
import { PuzzleModal } from "@/components/display/Modal/PuzzleModal";
import { PuzzleTrigger } from "@/components/action/Button/PuzzleTrigger";
import { Jigsaw } from "@/scenes/scene2/puzzles/jigsaw/Jigsaw";
import { SceneWrapper } from "@/components/layout/SceneWrapper";
import { Riddle } from "@/scenes/scene2/puzzles/riddle/Riddle";
import { useEffect } from "react";
import { GameEventTypes } from "../config/gameMachine";

type Props = {
  puzzles: Puzzle[];
};

export const Scene2 = ({ puzzles }: Props) => {
  const { state, send } = useGame();
  const {
    isModalOpen: isJigsawOpen,
    openModal: openJigsaw,
    closeModal: closeJigsaw,
  } = useModal();
  const {
    isModalOpen: isRiddleOpen,
    openModal: openRiddle,
    closeModal: closeRiddle,
  } = useModal();

  const { solvedPuzzles } = state.context;
  const isJigsawSolved = solvedPuzzles[Puzzles.jigsaw.name];
  const allPuzzlesSolved = puzzles.every((p) => solvedPuzzles[p.id]);

    const solveAllPuzzles = () => {
      send({
        type: GameEventTypes.solvePuzzle,
        puzzleId: Puzzles.riddleStage2.name,
        answer: Puzzles.riddleStage2.answer,
      });
      send({
        type: GameEventTypes.solvePuzzle,
        puzzleId: Puzzles.jigsaw.name,
        answer: Puzzles.jigsaw.answer,
      });
    };

  useEffect(() => {
    if (allPuzzlesSolved) {
      const timer = setTimeout(() => {
        send({ type: "NEXT" });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [allPuzzlesSolved, send]);

  const background = "/images/scenes/scene2/scene2-background.png";

  return (
    <SceneWrapper backgroundUrl={background}>
      <div className="w-full h-full relative">
                <button
          onClick={solveAllPuzzles}
          className="p-6 absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] text-white hover:text-black text-4xl font-bold hover:cursor-pointer"
        >
          Go to Scene 3
        </button>
        <PuzzleTrigger
          image={
            isJigsawSolved
              ? puzzleConfig.jigsaw.thumbnailFixed
              : puzzleConfig.jigsaw.thumbnail
          }
          alt="Open Jigsaw"
          className="w-[40px] lg:w-[50px] xl:w-[60px] 2xl:w-[80px] top-[69%] right-[52%]"
          action={openJigsaw}
        />

        <PuzzleTrigger
          image={puzzleConfig.riddle.thumbnail}
          alt="Open Riddle"
          className="w-[50px] lg:w-[65px] xl:w-[80px] 2xl:w-[95px] top-[60%] right-[18%]"
          action={openRiddle}
        />

        <PuzzleModal isPuzzleOpen={isJigsawOpen} closePuzzle={closeJigsaw}>
          {solvedPuzzles[Puzzles.jigsaw.name] ? (
            <PuzzleCompleted
              text={puzzleConfig.jigsaw.summary}
              close={closeJigsaw}
            />
          ) : (
            <Jigsaw close={closeJigsaw} />
          )}
        </PuzzleModal>

        <PuzzleModal isPuzzleOpen={isRiddleOpen} closePuzzle={closeRiddle}>
          {solvedPuzzles[Puzzles.riddleStage2.name] ? (
            <PuzzleCompleted
              text={puzzleConfig.riddle.summary}
              image={puzzleConfig.riddle.image}
              close={closeRiddle}
            />
          ) : (
            <Riddle close={closeRiddle} />
          )}
        </PuzzleModal>
      </div>
    </SceneWrapper>
  );
};
