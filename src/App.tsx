import { useMachine } from "@xstate/react";

import { Scene1, Scene2, Scene3 } from "@/scenes";
import { scenesConfig } from "@/scenes/config/scenesConfig";
import { createGameMachine } from "@/scenes/config/gameMachine";

import { SceneWrapper } from "@/components/layout/SceneWrapper";

const gameMachine = createGameMachine();

function App() {
  const [state, send] = useMachine(gameMachine);

  const { solvedPuzzles } = state.context;

  const currentScene = scenesConfig.find((scene) => state.matches(scene.id));
  if (!currentScene) return <h2>Game over</h2>;

  switch (currentScene.id) {
    case "scene1":
      return (
        <SceneWrapper backgroundUrl="/images/scenes/scene1/scene1-background.png">
          <Scene1
            puzzles={currentScene.puzzles}
            send={send}
            solvedPuzzles={solvedPuzzles}
          />
        </SceneWrapper>
      );
    case "scene2":
      return (
        <SceneWrapper backgroundUrl="/images/scenes/scene1/scene1-background.png">
          <Scene2
            puzzles={currentScene.puzzles}
            send={send}
            solvedPuzzles={solvedPuzzles}
          />
        </SceneWrapper>
      );
    case "scene3":
      return (
        <SceneWrapper backgroundUrl="/images/scenes/scene1/scene1-background.png">
          <Scene3
            puzzles={currentScene.puzzles}
            send={send}
            solvedPuzzles={solvedPuzzles}
          />
        </SceneWrapper>
      );
    default:
      return <h2>Game over</h2>;
  }
}

export default App;
