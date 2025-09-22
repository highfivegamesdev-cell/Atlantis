import { type ChangeEvent, useEffect, useState } from "react";
import { PuzzleWrapper } from "@/components/layout/PuzzleWrapper";
import { ThumbsUp } from "lucide-react";
import { useGame } from "@/scenes/config/useGame";
import { Puzzles } from "@/scenes/config/scenesConfig";
import { GameEventTypes } from "@/scenes/config/gameMachine";

type Props = {
  close: () => void;
};

const correctAnswer1 = ["the wind", "wind"];
const correctAnswer2 = ["the pearl", "pearl"];

export const Riddle = ({ close }: Props) => {
  const [riddle1Answer, setRiddle1Answer] = useState("");
  const [riddle2Answer, setRiddle2Answer] = useState("");

  const { send } = useGame();

  useEffect(() => {
    if (
      correctAnswer1.includes(riddle1Answer) &&
      correctAnswer2.includes(riddle2Answer)
    ) {
      setTimeout(() => {
        send({
          type: GameEventTypes.solvePuzzle,
          puzzleId: Puzzles.riddle.name,
          answer: Puzzles.riddle.answer,
        });
      }, 2000);
    }
  }, [riddle1Answer, riddle2Answer]);

  const handleRiddle1Change = (event: ChangeEvent<HTMLInputElement>) => {
    setRiddle1Answer(event.target.value.toLowerCase());
  };

  const handleRiddle2Change = (event: ChangeEvent<HTMLInputElement>) => {
    setRiddle2Answer(event.target.value.toLowerCase());
  };

  return (
    <PuzzleWrapper backgroundUrl="/images/scenes/scene1/puzzles/riddle-background.png">
      <button
        onClick={close}
        className="absolute top-[1%] right-[3%] text-white hover:text-black text-4xl font-bold hover:cursor-pointer"
      >
        ×
      </button>

      <form className="w-full h-full">
        <div className="flex items-center justify-center h-full gap-2 xl:gap-10 p-4 pb-0">
          <div className="mt-8 max-w-[200px] lg:max-w-[250px] p-1 xl:p-4 bg-transparent rounded">
            <p className="text-sm lg:text-base font-bold">
              I have no arms or legs, but I push and caress all. I cannot be
              held, yet I carry ships far. From Boreas to Zephyrus I wander
              free. What am I?
            </p>

            {correctAnswer1.includes(riddle1Answer) ? (
              <div className="flex justify-center">
                <ThumbsUp className="mt-4 text-green-600" />
              </div>
            ) : (
              <input
                name="riddle1"
                type="text"
                className="mt-4 p-2 border border-gray-300 bg-white rounded w-full"
                placeholder="Your answer"
                onChange={handleRiddle1Change}
              />
            )}
          </div>

          <div className="mt-8 max-w-[200px] lg:max-w-[250px] p-1 xl:p-4 bg-transparent rounded">
            <p className="text-sm lg:text-base font-bold">
              I grow without a garden, yet I live in the sea. I am hard yet
              precious, smooth but not frail. Found in a shell, I am prized for
              my sight. What am I?
            </p>
            {correctAnswer2.includes(riddle2Answer) ? (
              <div className="flex justify-center">
                <ThumbsUp className="mt-4 text-green-600" />
              </div>
            ) : (
              <input
                name="riddle2"
                type="text"
                className="mt-4 p-2 border border-gray-300 bg-white rounded w-full"
                placeholder="Your answer"
                onChange={handleRiddle2Change}
              />
            )}
          </div>
        </div>
      </form>
    </PuzzleWrapper>
  );
};
