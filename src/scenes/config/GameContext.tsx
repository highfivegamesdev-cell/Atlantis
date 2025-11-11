import { createContext, useEffect, type ReactNode } from "react";
import { useMachine } from "@xstate/react";
import type { ActorRefFrom, SnapshotFrom } from "xstate";

import { createGameMachine } from "@/scenes/config/gameMachine";
import { loadGameState, saveGameState } from "@/scenes/config/utils";

type GameActor = ActorRefFrom<ReturnType<typeof createGameMachine>>;

export const GameContext = createContext<{
  state: SnapshotFrom<GameActor>;
  send: GameActor["send"];
} | null>(null);

const persistedState = loadGameState();
const gameMachine = createGameMachine({
  value: persistedState?.value,
  context: persistedState?.context,
});

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, send] = useMachine(gameMachine);

  useEffect(() => {
    saveGameState({ value: state.value as string, context: state.context });
  }, [state.value, state.context]);

  return (
    <GameContext.Provider value={{ state, send }}>
      {children}
    </GameContext.Provider>
  );
};
