import { useEffect, useRef } from "react";

import { PuzzleWrapper } from "@/components/layout/PuzzleWrapper";
import { mazeBaseConfig } from "@/scenes/scene1/puzzles/maze/MazeGame";
import { useGame } from "@/scenes/config/useGame";
import { Puzzles } from "@/scenes/config/scenesConfig";
import { GameEventTypes } from "@/scenes/config/gameMachine";

type Props = {
  close: () => void;
};

export const Maze = ({ close }: Props) => {
  const { send } = useGame();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      ...mazeBaseConfig,
      parent: containerRef.current || undefined,
    };

    gameRef.current = new Phaser.Game(config);

    const waitForScene = () => {
      const scene = gameRef.current?.scene.getScene("MazeScene");
      if (scene) {
        scene.events.on("win", () => {
          send({
            type: GameEventTypes.solvePuzzle,
            puzzleId: Puzzles.maze.name,
            answer: Puzzles.maze.answer,
          });
        });
      } else {
        setTimeout(waitForScene, 100);
      }
    };

    waitForScene();

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  const handleReset = () => {
    if (gameRef.current) {
      const scene = gameRef.current.scene.getScene("MazeScene");
      scene.scene.restart();
    }
  };

  return (
    <PuzzleWrapper backgroundUrl="/images/scenes/scene1/puzzles/maze-background.png">
      <button
        onClick={close}
        className="absolute top-[1%] right-[3%] text-white hover:text-black text-4xl font-bold hover:cursor-pointer"
      >
        ×
      </button>
      <div className="w-full h-full flex items-center pl-4">
        <div ref={containerRef} />
      </div>
      <button onClick={handleReset}>Reset</button>
    </PuzzleWrapper>
  );
};
