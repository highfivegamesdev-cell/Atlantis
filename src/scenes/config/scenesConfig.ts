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
    answer: "SOLVED",
  },
} as const;

export const scenesConfig: SceneConfig[] = [
  {
    id: "scene1",
    puzzles: [
      { id: Puzzles.sudoku.name, answer: Puzzles.sudoku.answer },
      { id: "puzzle2", answer: "XYZ", item: "Klucz 🔑" },
      { id: "puzzle3", answer: "CODE" },
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
