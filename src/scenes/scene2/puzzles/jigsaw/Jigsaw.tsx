import { type ChangeEvent, useEffect, useState } from "react";
import { PuzzleWrapper } from "@/components/layout/PuzzleWrapper";
import { useGame } from "@/scenes/config/useGame";
import { Puzzles } from "@/scenes/config/scenesConfig";
import { GameEventTypes } from "@/scenes/config/gameMachine";
import { puzzleConfig } from "@/scenes/scene2/config";
import {JigsawGame} from "@/scenes/scene2/puzzles/jigsaw/JigsawGame";

type Props = {
  close: () => void;
};

export const Jigsaw = ({ close }: Props) => {
  const { send } = useGame();

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
