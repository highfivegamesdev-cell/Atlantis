import { PuzzleWrapper } from "@/components/layout/PuzzleWrapper";
import { puzzleConfig } from "@/scenes/scene2/config";
import { JigsawGame } from "@/scenes/scene2/puzzles/jigsaw/JigsawGame";

type Props = {
  close: () => void;
};

export const Jigsaw = ({ close }: Props) => {
  return (
    <PuzzleWrapper backgroundUrl={puzzleConfig.jigsaw.background}>
      <button
        onClick={close}
        className="absolute top-[1%] right-[3%] text-white hover:text-black text-4xl font-bold hover:cursor-pointer"
      >
        ×
      </button>

      <JigsawGame />
    </PuzzleWrapper>
  );
};
