import type { PropsWithChildren } from "react";

export const PuzzleCompletedWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-white w-[400px] h-[240px] md:w-[700px] md:h-[420px] lg:w-[1000px] lg:h-[600px] 3xl:w-[1600px] 3xl:h-[960px] relative overflow-auto">
      {children}
    </div>
  );
};
