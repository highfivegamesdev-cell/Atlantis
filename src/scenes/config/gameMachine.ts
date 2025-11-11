import { createMachine, assign } from "xstate";

import { scenesConfig } from "@/scenes/config/scenesConfig";
import type { SceneConfig } from "@/scenes/config/scenesConfig";

export type GameContextType = {
  solvedPuzzles: Record<string, boolean>;
  currentScene: string;
};

export const GameEventTypes = {
  solvePuzzle: "SOLVE_PUZZLE",
  next: "NEXT",
} as const;

export type GameEvent =
  | {
      type: typeof GameEventTypes.solvePuzzle;
      puzzleId: string;
      answer?: string;
    }
  | { type: typeof GameEventTypes.next };

  export type GameState = {
      value?: string;
  context?: Partial<GameContextType>;
  }

const buildScenesStates = (room: SceneConfig) => {
  return {
    [room.id]: {
      on: {
        SOLVE_PUZZLE: {
          actions: assign(({ context, event }) => {
            if (event.type !== GameEventTypes.solvePuzzle) return context;

            const puzzle = room.puzzles.find(
              (puzzle) => puzzle.id === event.puzzleId,
            );
            if (!puzzle) return context;

            if (event.answer === puzzle.answer) {
              return {
                ...context,
                solvedPuzzles: {
                  ...context.solvedPuzzles,
                  [puzzle.id]: true,
                },
              };
            }

            return context;
          }),
        },
        NEXT: {
          target: room.next ?? "exit",
          guard: ({ context }: { context: GameContextType }) =>
            room.puzzles.every((puzzle) => context.solvedPuzzles[puzzle.id]),
          actions: assign(({ context }) => ({
            ...context,
            currentScene: room.next ?? "exit",
          })),
        },
      },
    },
  };
};

export const createGameMachine = (initialState?: GameState) => {
  const states: Record<string, any> = {};
  scenesConfig.forEach((scene) =>
    Object.assign(states, buildScenesStates(scene)),
  );

  states["exit"] = { type: "final" };

  return createMachine({
    id: "game",
    initial: initialState?.value ?? scenesConfig[0].id,
    types: {} as {
      context: GameContextType;
    },
    context: {
      solvedPuzzles: {},
      currentScene: initialState?.context?.currentScene ?? scenesConfig[0].id,
      ...initialState?.context,
    },
    states,
  });
};
