import { useEffect, useRef } from 'react';
import { Canvas, painters } from 'headbreaker';
import { puzzleConfig } from '@/scenes/scene2/config';
import { useGame } from "@/scenes/config/useGame";
import { Puzzles } from "@/scenes/config/scenesConfig";
import { GameEventTypes } from "@/scenes/config/gameMachine";

export const JigsawGame = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
    const { send } = useGame();
  const id = 'jigsaw-puzzle';

  useEffect(() => {
    if (!containerRef.current) return;

    const img = new Image();
    img.src = puzzleConfig.jigsaw.puzzle;

    img.onload = () => {
      const horizontalPiecesCount = 6;
      const verticalPiecesCount = 6;

      const canvas = new Canvas(id, {
        width:  700,
        height:  500,
        image: img,
pieceSize: 70, proximity: 20,
    borderFill: 10, strokeWidth: 1.5,
    lineSoftness: 0.18,
    fixed: true,
        preventOffstageDrag: true,
        painter: new painters.Konva()
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
      if (node) node.innerHTML = '';
    };
  }, []);

  return (
    <div className="bg-black w-full h-full flex items-center justify-center overflow-auto p-4">
      <div ref={containerRef} id={id} className="relative" />
    </div>
  );
};
