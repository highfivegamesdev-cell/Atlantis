import { useEffect, useRef } from "react";

import { PuzzleWrapper } from "@/components/layout/PuzzleWrapper";
import { mazeBaseConfig } from "@/scenes/scene1/puzzles/maze/MazeGame";
import { useGame } from "@/scenes/config/useGame";
import { Puzzles } from "@/scenes/config/scenesConfig";
import { GameEventTypes } from "@/scenes/config/gameMachine";
import { puzzleConfig } from "@/scenes/scene1/config";

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
    <PuzzleWrapper backgroundUrl={puzzleConfig.maze.background}>
      <button
        onClick={close}
        className="absolute top-[1%] right-[3%] text-white hover:text-black text-4xl font-bold hover:cursor-pointer"
      >
        ×
      </button>
      <div className="flex p-4 gap-4">
        <div className="w-full h-full flex items-center">
          <div ref={containerRef} />
        </div>
        <div className="flex flex-col align-center w-full mt-10 p-2 gap-8">
          <button
            className="bg-white font-bold text-red-500 hover:text-red-800 px-4 py-2 rounded hover:cursor-pointer"
            onClick={handleReset}
          >
            Reset
          </button>

          <p className="bg-white opacity-65 font-bold p-2 rounded">
            Navigate the maze to find the hidden icon. Use the arrow keys to
            move your character. Reach the icon to complete the puzzle!
          </p>
        </div>
      </div>
    </PuzzleWrapper>
  );
};
