import { useEffect, useRef } from "react";
import { Canvas, painters } from "headbreaker";
import { puzzleConfig } from "@/scenes/scene2/config";
import { useGame } from "@/scenes/config/useGame";
import { Puzzles } from "@/scenes/config/scenesConfig";
import { GameEventTypes } from "@/scenes/config/gameMachine";
import { useTailwindBreakpoint } from "@/lib/hooks/useTailwindBreakpoint";

const canvasConfig: Record<
  string,
  { width: number; height: number; pieceSize: number }
> = {
  base: { width: 384, height: 224, pieceSize: 60 },
  md: { width: 684, height: 404, pieceSize: 60 },
  lg: { width: 984, height: 584, pieceSize: 70 },
  xl: { width: 984, height: 584, pieceSize: 80 },
  "2xl": { width: 984, height: 584, pieceSize: 80 },
  "3xl": { width: 984, height: 584, pieceSize: 80 },
};

// w-[400px] h-[240px] md:w-[700px] md:h-[420px] lg:w-[1000px] lg:h-[600px] 3xl:w-[1600px] 3xl:h-[960px]

export const JigsawGame = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { send } = useGame();
  const id = "jigsaw-puzzle";

  const breakpoint = useTailwindBreakpoint();

  console.log(breakpoint);

  const width = canvasConfig[breakpoint].width;
  const height = canvasConfig[breakpoint].height;
  const pieceSize = canvasConfig[breakpoint].pieceSize;

  useEffect(() => {
    if (!containerRef.current) return;

    const img = new Image();
    img.src = puzzleConfig.jigsaw.puzzle;

    img.onload = () => {
      const horizontalPiecesCount = 6;
      const verticalPiecesCount = 6;

      const canvas = new Canvas(id, {
        width: width,
        height: height,
        image: img,
        pieceSize: pieceSize,
        proximity: 20,
        borderFill: 10,
        strokeWidth: 1.5,
        lineSoftness: 0.18,
        fixed: true,
        preventOffstageDrag: true,
        painter: new painters.Konva(),
      });

      canvas.adjustImagesToPuzzleHeight();
      canvas.autogenerate({ horizontalPiecesCount, verticalPiecesCount });
      canvas.shuffle(0.7);
      canvas.draw();

      let reported = false;
      canvas.onConnect(() => {
        if (!reported && canvas.puzzle.connected) {
          reported = true;
          send({
            type: GameEventTypes.solvePuzzle,
            puzzleId: Puzzles.jigsaw.name,
            answer: Puzzles.jigsaw.answer,
          });
        }
      });
    };

    return () => {
      const node = document.getElementById(id);
      if (node) node.innerHTML = "";
    };
  }, []);

  return (
    <div className="bg-gray-900 w-full h-full flex items-center justify-center overflow-auto">
      <div ref={containerRef} id={id} className="relative" />
    </div>
  );
};
