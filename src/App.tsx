import Modal from "react-modal";

import { Scene1, Scene2, Scene3 } from "@/scenes";
import { scenesConfig } from "@/scenes/config/scenesConfig";
import { useGame } from "@/scenes/config/useGame";

import { SceneWrapper } from "@/components/layout/SceneWrapper";

Modal.setAppElement("#root");

function App() {
  const { state, send } = useGame();

  const { solvedPuzzles } = state.context;

  const currentScene = scenesConfig.find((scene) => state.matches(scene.id));
  if (!currentScene) return <h2>Game over</h2>;

  switch (currentScene.id) {
    case "scene1":
      return <Scene1 puzzles={currentScene.puzzles} />;
    case "scene2":
      return (
          <Scene2
            puzzles={currentScene.puzzles}
          />
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
