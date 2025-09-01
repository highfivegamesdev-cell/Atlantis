import { useMachine } from "@xstate/react";

import { Scene1, Scene2, Scene3 } from "@/scenes";
import { scenesConfig } from "@/scenes/config/scenesConfig";
import { createGameMachine } from "@/scenes/config/gameMachine";

const gameMachine = createGameMachine();

function App() {
  const [state, send] = useMachine(gameMachine);

  const { solvedPuzzles } = state.context;

  const currentScene = scenesConfig.find((scene) => state.matches(scene.id));
  if (!currentScene) return <h2>Game over</h2>;

  switch (currentScene.id) {
    case "scene1":
      return (
        <Scene1
          puzzles={currentScene.puzzles}
          send={send}
          solvedPuzzles={solvedPuzzles}
        />
      );
    case "scene2":
      return (
        <Scene2
          puzzles={currentScene.puzzles}
          send={send}
          solvedPuzzles={solvedPuzzles}
        />
      );
    case "scene3":
      return (
        <Scene3
          puzzles={currentScene.puzzles}
          send={send}
          solvedPuzzles={solvedPuzzles}
        />
      );
    default:
      return <h2>Game over</h2>;
  }
}

export default App;
