import { generateMaze } from "@/scenes/scene1/puzzles/maze/lib/generateMaze";

const MAZE_WIDTH = 61;
const MAZE_HEIGHT = 51;
export const MAZE_TILE_SIZE = 10;
export const MAZE_START = { x: Math.floor(MAZE_WIDTH / 2), y: 1 };
export const MAZE_GOAL = {
  x: Math.floor(MAZE_WIDTH / 2),
  y: Math.floor(MAZE_HEIGHT / 2),
};
export const mazeMap = generateMaze(MAZE_WIDTH, MAZE_HEIGHT, 45);
