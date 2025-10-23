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
  shapeMatcher: {
    name: "shapeMatcher",
    answer: "SHAPE_MATCHER_SOLVED",
  },
  jigsaw: {
    name: "jigsaw",
    answer: "JIGSAW_SOLVED",
  },
  riddleStage2: {
    name: "riddleStage2",
    answer: "RIDDLE_STAGE_2_SOLVED",
  },
  slider: {
    name: "slider",
    answer: "SLIDER_SOLVED",
  },
} as const;

export const scenesConfig: SceneConfig[] = [
  {
    id: "scene1",
    puzzles: [
      { id: Puzzles.sudoku.name, answer: Puzzles.sudoku.answer },
      { id: Puzzles.maze.name, answer: Puzzles.maze.answer },
      { id: Puzzles.riddle.name, answer: Puzzles.riddle.answer },
      { id: Puzzles.shapeMatcher.name, answer: Puzzles.shapeMatcher.answer },
    ],
    next: "scene2",
  },
  {
    id: "scene2",
    puzzles: [
      { id: Puzzles.jigsaw.name, answer: Puzzles.jigsaw.answer },
      { id: Puzzles.riddleStage2.name, answer: Puzzles.riddleStage2.answer },
    ],
    next: "scene3",
  },
  {
    id: "scene3",
    puzzles: [{ id: Puzzles.slider.name, answer: Puzzles.slider.answer }],
    next: "exit",
  },
];
