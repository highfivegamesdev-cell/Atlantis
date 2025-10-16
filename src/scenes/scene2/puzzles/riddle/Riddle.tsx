import { useEffect, useState, type MouseEvent } from "react";
import { PuzzleWrapper } from "@/components/layout/PuzzleWrapper";
import { useGame } from "@/scenes/config/useGame";
import { Puzzles } from "@/scenes/config/scenesConfig";
import { GameEventTypes } from "@/scenes/config/gameMachine";
import { puzzleConfig } from "@/scenes/scene2/config";

type Props = {
  close: () => void;
};

const correctAnswer = "3214";

export const Riddle = ({ close }: Props) => {
  const [answer, setAnswer] = useState("");

  const { send } = useGame();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.id;
    setAnswer((prev) => prev + id);
  };

  useEffect(() => {
    if (answer.length < 4) return;
    if (answer.length === 4 && answer !== correctAnswer) {
      setAnswer("");
    }
    if (correctAnswer === answer) {
      send({
        type: GameEventTypes.solvePuzzle,
        puzzleId: Puzzles.riddleStage2.name,
        answer: Puzzles.riddleStage2.answer,
      });
    }
  }, [answer]);

  return (
    <PuzzleWrapper backgroundUrl={puzzleConfig.riddle.background}>
      <button
        onClick={close}
        className="absolute top-[1%] right-[3%] text-white hover:text-black text-4xl font-bold hover:cursor-pointer"
      >
        ×
      </button>

      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
        <img
          className="w-[50%] mt-16"
          src={puzzleConfig.riddle.text}
          alt="Riddle Text"
        />
        <div className="flex gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <button
              key={index}
              id={`${index + 1}`}
              style={{
                border: answer.includes(`${index + 1}`)
                  ? "3px solid teal"
                  : "3px solid transparent",
              }}
              className="hover:cursor-pointer border border-transparent hover:border-teal-200 duration-300 hover:shadow-[0_0_20px_rgba(20,184,166,0.8)] transition"
              onClick={handleClick}
            >
              <img
                className="w-[80px]"
                src={`/images/scenes/scene2/puzzles/statue${index + 1}-icon.png`}
                alt={`Riddle Option ${index + 1}`}
              />
            </button>
          ))}
        </div>
      </div>
    </PuzzleWrapper>
  );
};
