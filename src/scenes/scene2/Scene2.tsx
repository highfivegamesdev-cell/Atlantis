import type { Puzzle } from "@/scenes/config/scenesConfig";
import type { GameEvent } from "@/scenes/config/gameMachine";

type Props = {
  puzzles: Puzzle[];
  solvedPuzzles: Record<string, boolean>;
  send: (event: GameEvent) => void;
};

export const Scene2 = ({ puzzles, solvedPuzzles, send }: Props) => {
  // const allPuzzlesSolved = puzzles.every((p) => solvedPuzzles[p.id]);
  const allPuzzlesSolved = true;

  return (
    <>
      <h1>Scene 2</h1>

      {allPuzzlesSolved && (
        <button onClick={() => send({ type: "NEXT" })}>Next scene</button>
      )}
    </>
  );
};
