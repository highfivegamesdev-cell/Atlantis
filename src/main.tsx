import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { GameProvider } from "@/scenes/config/GameContext";
import { router } from "@/router/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameProvider>
      <RouterProvider router={router} />
    </GameProvider>
  </StrictMode>,
);
