import { useState, useEffect } from "react";

import { PuzzleWrapper } from "@/components/layout/PuzzleWrapper";
import type { SudokuGrid } from "@/scenes/scene1/puzzles/sudoku/config";
import type { GameEvent } from "@/scenes/config/gameMachine";
import { Puzzles } from "@/scenes/config/scenesConfig";
import { GameEventTypes } from "@/scenes/config/gameMachine";

type Props = {
  initialGrid: SudokuGrid;
  solutionGrid: SudokuGrid;
  send: (event: GameEvent) => void;
  close: () => void;
};

type ErrorCell = {
  row: number;
  col: number;
  value: number;
};

export const Sudoku = ({ initialGrid, solutionGrid, send, close }: Props) => {
  const [userGrid, setUserGrid] = useState(
    initialGrid.map((row) => row.slice())
  );
  const [errorCells, setErrorCells] = useState<ErrorCell[]>([]);

  useEffect(() => {
    const isSolved = userGrid.every((row, rowIndex) =>
      row.every((value, colIndex) => value === solutionGrid[rowIndex][colIndex])
    );
    if (isSolved) {
      send({
        type: GameEventTypes.solvePuzzle,
        puzzleId: Puzzles.sudoku.name,
        answer: Puzzles.sudoku.answer,
      });

      close();
    }
  }, [userGrid, solutionGrid]);

  const handleChange = (
    row: number,
    col: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value.trim();
    if (inputValue === "") return;

    const value = parseInt(inputValue);
    if (isNaN(value) || value < 1 || value > 9) {
      event.target.value = "";
      return;
    }

    if (value === solutionGrid[row][col]) {
      setUserGrid((prev) => {
        const newGrid = prev.map((r) => r.slice());
        newGrid[row][col] = value;
        return newGrid;
      });
    } else {
      setErrorCells((prev) => [...prev, { row, col, value }]);

      setTimeout(() => {
        setErrorCells((prev) =>
          prev.filter((cell) => !(cell.row === row && cell.col === col))
        );
      }, 3000);
    }
  };

  const getDisplayValue = (row: number, col: number) => {
    const error = errorCells.find(
      (cell) => cell.row === row && cell.col === col
    );
    if (error) return error.value;

    return userGrid[row][col] !== 0 ? userGrid[row][col] : "";
  };

  const getCellClass = (row: number, col: number) => {
    const isError = errorCells.some(
      (cell) => cell.row === row && cell.col === col
    );
    const baseClass =
      "w-[50px] h-[50px] text-center text-xl font-bold text-white [text-shadow:0_0_10px_#99ffff,0_0_20px_#99ffff,0_0_40px_#99ffff]";
    const errorClass = isError
      ? "[text-shadow:0_0_10px_#ff4d4d,0_0_20px_#ff4d4d,0_0_40px_#ff4d4d]"
      : "";

    return `${baseClass} ${errorClass}`;
  };

  const isCellDisabled = (row: number, col: number) => {
    return (
      userGrid[row][col] !== 0 && userGrid[row][col] === solutionGrid[row][col]
    );
  };

  return (
    <PuzzleWrapper backgroundUrl="/images/scenes/scene1/puzzles/sudoku-background.png">
      <button
        onClick={() => {
          send({
            type: GameEventTypes.solvePuzzle,
            puzzleId: Puzzles.sudoku.name,
            answer: Puzzles.sudoku.answer,
          });

          close();
        }}
      >
        Solve sudoku
      </button>

      <div className="absolute top-[40px] left-[252px]">
        <div className="grid grid-cols-9 gap-[6px]">
          {userGrid.map((rowData, row) =>
            rowData.map((_, col) => (
              <input
                key={`${row}-${col}`}
                type="text"
                maxLength={1}
                value={getDisplayValue(row, col)}
                onChange={(e) => handleChange(row, col, e)}
                disabled={isCellDisabled(row, col)}
                className={getCellClass(row, col)}
              />
            ))
          )}
        </div>
      </div>
    </PuzzleWrapper>
  );
};
