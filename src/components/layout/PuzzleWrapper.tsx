import type { PropsWithChildren } from "react";

interface Props {
  backgroundUrl: string;
}

export const PuzzleWrapper = ({
  backgroundUrl,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div
      className="w-[1000px] h-[600px] relative bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      {children}
    </div>
  );
};
