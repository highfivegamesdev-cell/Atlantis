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
      className="w-[400px] h-[240px] md:w-[700px] md:h-[420px] lg:w-[1000px] lg:h-[600px] 3xl:w-[1600px] 3xl:h-[960px] relative bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : undefined,
      }}
    >
      {children}
    </div>
  );
};
