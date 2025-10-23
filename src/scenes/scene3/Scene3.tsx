import type { Puzzle } from "@/scenes/config/scenesConfig";
import { useGame } from "@/scenes/config/useGame";
import { SceneWrapper } from "@/components/layout/SceneWrapper";
import { PuzzleTrigger } from "@/components/action/Button/PuzzleTrigger";
import { Puzzles } from "@/scenes/config/scenesConfig";
import { puzzleConfig } from "@/scenes/scene3/config";
import { useModal } from "@/lib/hooks/useModal";
import { PuzzleModal } from "@/components/display/Modal/PuzzleModal";
import { PuzzleCompleted } from "@/components/display/PuzzleCompleted/PuzzleCompleted";
import { Slider } from "@/scenes/scene3/puzzles/slider/Slider";
import {GameCompleted} from "@/scenes/scene3/GameCompleted";

type Props = {
  puzzles: Puzzle[];
};

export const Scene3 = ({ puzzles }: Props) => {
  const { state } = useGame();

    const {
      isModalOpen: isSliderOpen,
      openModal: openSlider,
      closeModal: closeSlider,
    } = useModal();

    const { solvedPuzzles } = state.context;
  const allPuzzlesSolved = puzzles.every((p) => solvedPuzzles[p.id]);

  const background = "/images/scenes/scene3/scene3-background.png";

  if (allPuzzlesSolved) {
    return (
      <SceneWrapper backgroundUrl={background}>
        <div className="w-full h-full relative">
          <GameCompleted />
        </div>
      </SceneWrapper>
    );
  }

  return (
    <SceneWrapper backgroundUrl={background}>
      <div className="w-full h-full relative">
                <PuzzleTrigger
                  image={
                  
                      puzzleConfig.slider.thumbnail
                  }
                  alt="Open Slider"
                  className="w-[40px] lg:w-[50px] xl:w-[60px] 2xl:w-[80px] top-[82%] right-[28%]"
                  action={openSlider}
                />

                        <PuzzleModal isPuzzleOpen={isSliderOpen} closePuzzle={closeSlider}>
                          {solvedPuzzles[Puzzles.slider.name] ? (
                            <PuzzleCompleted
                              text={puzzleConfig.slider.summary}
                              close={closeSlider}
                            />
                          ) : (
                            <Slider />
                          )}
                        </PuzzleModal>
      </div>
    </SceneWrapper>
  );
};
