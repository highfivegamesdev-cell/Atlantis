import { createMachine, assign } from "xstate";

import { scenesConfig } from "@/scenes/config/scenesConfig";
import type { SceneConfig } from "@/scenes/config/scenesConfig";

type GameContext = {
  // inventory: string[];
  solvedPuzzles: Record<string, boolean>;
  currentScene: string;
};

export type GameEvent =
  | { type: "SOLVE_PUZZLE"; puzzleId: string; answer: string }
  | { type: "NEXT" };

const buildScenesStates = (room: SceneConfig) => {
  return {
    [room.id]: {
      on: {
        SOLVE_PUZZLE: {
          actions: assign((context: GameContext, event: GameEvent) => {
            if (event.type !== "SOLVE_PUZZLE") return context;

            const puzzle = room.puzzles.find(
              (puzzle) => (puzzle.id = event.puzzleId)
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
          condition: (context: GameContext) =>
            room.puzzles.every((puzzle) => context.solvedPuzzles[puzzle.id]),
        },
      },
    },
  };
};

export const createGameMachine = () => {
  const states: Record<string, any> = {};
  scenesConfig.forEach((scene) =>
    Object.assign(states, buildScenesStates(scene))
  );

  states["exit"] = { type: "final" };

  return createMachine({
    id: "game",
    initial: scenesConfig[0].id,
    context: {
      solvedPuzzles: {},
      currentScene: scenesConfig[0].id,
    },
    states,
  });
};
