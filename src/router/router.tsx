import { Navigate, createBrowserRouter, useLoaderData } from "react-router-dom";

import App from "../App";
import { Scene1, Scene2, Scene3 } from "@/scenes";
import { scenesConfig } from "@/scenes/config/scenesConfig";
import type { Puzzle } from "@/scenes/config/scenesConfig";
import { routes } from "./routes";

const getSceneConfig = (sceneId: string) => {
  const scene = scenesConfig.find((entry) => entry.id === sceneId);

  if (!scene) {
    throw new Response("Not Found", { status: 404 });
  }

  return scene;
};

const createSceneLoader = (sceneId: string) => () => getSceneConfig(sceneId).puzzles;

const CurrentSceneRedirect = () => <Navigate to={routes.scene1} replace />;

const Scene1Route = () => {
  const puzzles = useLoaderData() as Puzzle[];

  return <Scene1 puzzles={puzzles} />;
};

const Scene2Route = () => {
  const puzzles = useLoaderData() as Puzzle[];

  return <Scene2 puzzles={puzzles} />;
};

const Scene3Route = () => {
  const puzzles = useLoaderData() as Puzzle[];

  return <Scene3 puzzles={puzzles} />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <CurrentSceneRedirect />,
      },
      {
        path: routes.scene1,
        loader: createSceneLoader("scene1"),
        element: <Scene1Route />,
      },
      {
        path: routes.scene2,
        loader: createSceneLoader("scene2"),
        element: <Scene2Route />,
      },
      {
        path: routes.scene3,
        loader: createSceneLoader("scene3"),
        element: <Scene3Route />,
      },
    ],
  },
]);
