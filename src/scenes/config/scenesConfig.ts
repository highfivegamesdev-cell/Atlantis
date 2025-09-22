export type Puzzle = {
  id: string;
  answer: string;
  item?: string;
};

export type SceneConfig = {
  id: string;
  puzzles: Puzzle[];
  next?: string;
};

export const Puzzles = {
  sudoku: {
    name: "sudoku",
    answer: "SUDOKU_SOLVED",
  },
  maze: {
    name: "maze",
    answer: "MAZE_SOLVED",
  },
  riddle: {
    name: "riddle",
    answer: "RIDDLE_SOLVED",
  },
} as const;

export const scenesConfig: SceneConfig[] = [
  {
    id: "scene1",
    puzzles: [
      { id: Puzzles.sudoku.name, answer: Puzzles.sudoku.answer },
      { id: Puzzles.maze.name, answer: Puzzles.maze.answer },
      { id: Puzzles.riddle.name, answer: Puzzles.riddle.answer },
    ],
    next: "scene2",
  },
  {
    id: "scene2",
    puzzles: [{ id: "puzzle4", answer: "SECRET", item: "Mapa 🗺️" }],
    next: "scene3",
  },
  {
    id: "scene3",
    puzzles: [{ id: "puzzle5", answer: "SECRET", item: "Mapa 🗺️" }],
    next: "exit",
  },
];
