import { useContext } from "react";

import { GameContext } from "@/scenes/config/GameContext";

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside GameProvider");
  return ctx;
};
