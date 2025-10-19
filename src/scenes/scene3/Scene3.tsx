import type { Puzzle } from "@/scenes/config/scenesConfig";
// import { useGame } from "@/scenes/config/useGame";
import { SceneWrapper } from "@/components/layout/SceneWrapper";

type Props = {
  puzzles: Puzzle[];
};

export const Scene3 = ({ puzzles }: Props) => {
  // const { state } = useGame();

  // const { solvedPuzzles } = state.context;

  console.log(puzzles);

  const background = "/images/scenes/scene3/scene3-background.png";

  return (
    <SceneWrapper backgroundUrl={background}>
      <div className="w-full h-full relative"></div>
    </SceneWrapper>
  );
};
