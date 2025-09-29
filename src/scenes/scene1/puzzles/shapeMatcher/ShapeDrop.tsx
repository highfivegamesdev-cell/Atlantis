import { type PropsWithChildren } from "react";
import { useDroppable } from "@dnd-kit/core";

type Props = {
  id: string;
};

export const ShapeDrop = ({ id, children }: PropsWithChildren<Props>) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`w-[120px] lg:w-[140px] xl:w-[160px] 2xl:w-[180px] h-[120px] lg:h-[140px] xl:h-[160px] 2xl:h-[180px] border-2 border-dashed rounded-lg flex items-center justify-center bg-cover bg-center transition-colors ${
        isOver ? "border-green-400 bg-green-50" : "border-gray-300"
      }`}
      style={{
        backgroundImage: `url(/images/scenes/scene1/puzzles/shape-matcher-image.jpg)`,
      }}
    >
      {children || <span className="text-white text-sm">Empty</span>}
    </div>
  );
};
