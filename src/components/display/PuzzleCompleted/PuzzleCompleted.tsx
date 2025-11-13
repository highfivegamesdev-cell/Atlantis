import { PuzzleCompletedWrapper } from "@/components/layout/PuzzleCompletedWrapper";

type Props = {
  text: string;
  image?: string;
  close: () => void;
};

export const PuzzleCompleted = ({ text, image, close }: Props) => {
  return (
    <PuzzleCompletedWrapper smallSize={!image}>
      <button
        onClick={close}
        className="absolute top-[1%] right-[3%] text-black hover:text-gray-500 text-4xl font-bold hover:cursor-pointer"
      >
        ×
      </button>

      <div className="pt-6 flex flex-col items-center gap-6">
        {image ? (
          <img
            className="text-center w-[400px]"
            src={image}
            alt="Puzzle Completed"
          />
        ) : (
          <div />
        )}
        <p className="font-bold">{text}</p>
        <button
          className="bg-blue-700 text-white font-bold px-4 py-2 mt-2 rounded hover:bg-blue-800 transition hover:cursor-pointer"
          onClick={close}
        >
          Next
        </button>
      </div>
    </PuzzleCompletedWrapper>
  );
};
