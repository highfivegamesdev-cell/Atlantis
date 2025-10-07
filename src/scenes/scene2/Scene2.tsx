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

  const { solvedPuzzles } = state.context;
  const allPuzzlesSolved = puzzles.every((p) => solvedPuzzles[p.id]);

  const background = "/images/scenes/scene2/scene2-background.jpg";

  return (
    <SceneWrapper backgroundUrl={background}>
      <div className="w-full h-full relative">
        <PuzzleTrigger
          image={puzzleConfig.jigsaw.thumbnail}
          alt="Open Jigsaw"
          className="w-[40px] lg:w-[50px] xl:w-[60px] 2xl:w-[80px] top-[69%] right-[36%]"
          action={openJigsaw}
        />

        <PuzzleModal isPuzzleOpen={isJigsawOpen} closePuzzle={closeJigsaw}>
          {solvedPuzzles[Puzzles.jigsaw.name] ? (
            <PuzzleCompleted
              text={puzzleConfig.jigsaw.summary}
              image={puzzleConfig.jigsaw.image}
              close={closeJigsaw}
            />
          ) : (
            <Jigsaw close={closeJigsaw} />
          )}
        </PuzzleModal>
      </div>
    </SceneWrapper>
  );
};
