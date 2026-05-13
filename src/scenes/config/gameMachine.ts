import { createMachine, assign } from "xstate";

import { scenesConfig } from "@/scenes/config/scenesConfig";

export type GameContextType = {
  solvedPuzzles: Record<string, boolean>;
};

export const GameEventTypes = {
  solvePuzzle: "SOLVE_PUZZLE",
} as const;

export type GameEvent =
  | {
      type: typeof GameEventTypes.solvePuzzle;
      puzzleId: string;
      answer?: string;
    };

export type GameState = {
  context?: Partial<GameContextType>;
};

const allPuzzles = scenesConfig.flatMap((scene) => scene.puzzles);

export const createGameMachine = (initialState?: GameState) => {
  return createMachine({
    id: "game",
    initial: "playing",
    types: {} as {
      context: GameContextType;
    },
    context: {
      solvedPuzzles: initialState?.context?.solvedPuzzles ?? {},
      ...initialState?.context,
    },
    states: {
      playing: {
        on: {
          SOLVE_PUZZLE: {
            actions: assign(({ context, event }) => {
              if (event.type !== GameEventTypes.solvePuzzle) return context;

              const puzzle = allPuzzles.find(
                (entry) => entry.id === event.puzzleId,
              );
              if (!puzzle || event.answer !== puzzle.answer) {
                return context;
              }

              return {
                ...context,
                solvedPuzzles: {
                  ...context.solvedPuzzles,
                  [puzzle.id]: true,
                },
              };
            }),
          },
        },
      },
    },
  });
};
