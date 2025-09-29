import { puzzleConfig } from "@/scenes/scene1/config";

export const shapesConfig = [
  {
    id: "sun",
    backgroundUrl: "/images/scenes/scene1/puzzles/shape-sun.png",
  },
  { id: "moon", backgroundUrl: puzzleConfig.maze.image },
  {
    id: "oval",
    backgroundUrl: "/images/scenes/scene1/puzzles/shape-oval.png",
  },
  { id: "triangle", backgroundUrl: puzzleConfig.sudoku.image },
  {
    id: "rectangle",
    backgroundUrl: "/images/scenes/scene1/puzzles/shape-rectangle.png",
  },
  { id: "sphere", backgroundUrl: puzzleConfig.riddle.image },
];
