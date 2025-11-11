import { type GameState } from "@/scenes/config/gameMachine";

const THREE_HOURS = 3 * 60 * 60 * 1000;

export function saveGameState(data: GameState) {
  const payload = {
    expiresAt: Date.now() + THREE_HOURS,
    data,
  };
  localStorage.setItem("gameState", JSON.stringify(payload));
}

export function loadGameState(): GameState | null {
  const raw = localStorage.getItem("gameState");
  if (!raw) return null;
  const { expiresAt, data } = JSON.parse(raw);
  if (typeof expiresAt === "number" && Date.now() < expiresAt) {
    return data as GameState;
  }

  localStorage.removeItem("gameState");
  return null;
}
