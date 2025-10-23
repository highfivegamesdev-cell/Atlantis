import { useEffect, useState } from "react";
import { puzzleConfig } from "@/scenes/scene3/config";
import { sliderConfig, GRID_SIZE } from "@/scenes/scene3/puzzles/slider/config";
import { useTailwindBreakpoint } from "@/lib/hooks/useTailwindBreakpoint";
import { generateSolvableShuffle } from "./utils";
import { type Tile } from "./types";
import { Puzzles } from "@/scenes/config/scenesConfig";
import { GameEventTypes } from "@/scenes/config/gameMachine";
import { useGame } from "@/scenes/config/useGame";
import { PuzzleWrapper } from "@/components/layout/PuzzleWrapper";

export const Slider = () => {
  const totalTiles = GRID_SIZE * GRID_SIZE;
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [emptyIndex, setEmptyIndex] = useState(totalTiles - 1);
  const [isSolved, setIsSolved] = useState(false);

  const breakpoint = useTailwindBreakpoint();
  const size = sliderConfig[breakpoint].size;
  const { send } = useGame();

  useEffect(() => {
    const arr: Tile[] = Array.from({ length: totalTiles }, (_, i) => ({
      id: i,
      correctIndex: i,
    }));

    arr[totalTiles - 1].id = -1;

    const shuffled = generateSolvableShuffle(arr);
    setTiles(shuffled);
  }, []);

  const checkIfSolved = (tiles: Tile[]): boolean => {
    return tiles.every((tile, index) => tile.id === -1 || tile.id === index);
  };

  const handleTileClick = (index: number) => {
    if (canMove(index, emptyIndex)) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [
        newTiles[emptyIndex],
        newTiles[index],
      ];
      setTiles(newTiles);
      setEmptyIndex(index);

      if (checkIfSolved(newTiles)) {
        setTimeout(() => {
          setIsSolved(true);
        }, 300);
      }
    }
  };

  const canMove = (i: number, empty: number): boolean => {
    const rowI = Math.floor(i / GRID_SIZE);
    const colI = i % GRID_SIZE;
    const rowE = Math.floor(empty / GRID_SIZE);
    const colE = empty % GRID_SIZE;
    return (
      (rowI === rowE && Math.abs(colI - colE) === 1) ||
      (colI === colE && Math.abs(rowI - rowE) === 1)
    );
  };

  const tileSize = size / GRID_SIZE;

  useEffect(() => {
    if (isSolved) {
      send({
        type: GameEventTypes.solvePuzzle,
        puzzleId: Puzzles.slider.name,
        answer: Puzzles.slider.answer,
      });
    }
  }, [isSolved]);

  return (
    <PuzzleWrapper backgroundUrl={puzzleConfig.slider.background}>
      <button
        onClick={close}
        className="absolute top-[1%] right-[3%] text-white hover:text-black text-4xl font-bold hover:cursor-pointer z-10"
      >
        ×
      </button>

      <div className="w-full h-full flex flex-col items-center gap-4 bg-gray-800 p-4">
        <div
          className="relative border border-gray-300"
          style={{
            width: size,
            height: size,
            display: "grid",
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
            overflow: "hidden",
            backgroundColor: "#ddd",
          }}
        >
          {tiles.map((tile, index) => {
            if (tile.id === -1) {
              return (
                <div
                  key={index}
                  style={{ width: tileSize, height: tileSize }}
                />
              );
            }

            const row = Math.floor(tile.id / GRID_SIZE);
            const col = tile.id % GRID_SIZE;

            return (
              <div
                key={index}
                onClick={() => handleTileClick(index)}
                style={{
                  width: tileSize,
                  height: tileSize,
                  backgroundImage: `url(${puzzleConfig.slider.puzzle})`,
                  backgroundSize: `${size}px ${size}px`,
                  backgroundPosition: `-${col * tileSize}px -${row * tileSize}px`,
                  border: "1px solid #fff",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
              />
            );
          })}
        </div>

        <button
          onClick={() => setTiles((prev) => generateSolvableShuffle(prev))}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 hover:cursor-pointer"
        >
          Shuffle
        </button>
      </div>
    </PuzzleWrapper>
  );
};
