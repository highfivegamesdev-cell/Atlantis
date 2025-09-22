import { createContext } from "react";
import type { ReactNode } from "react";
import { useMachine } from "@xstate/react";
import type { ActorRefFrom, SnapshotFrom } from "xstate";

import { createGameMachine } from "@/scenes/config/gameMachine";

type GameActor = ActorRefFrom<ReturnType<typeof createGameMachine>>;

export const GameContext = createContext<{
  state: SnapshotFrom<GameActor>;
  send: GameActor["send"];
} | null>(null);

const gameMachine = createGameMachine();

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, send] = useMachine(gameMachine);

  return (
    <GameContext.Provider value={{ state, send }}>
      {children}
    </GameContext.Provider>
  );
};
