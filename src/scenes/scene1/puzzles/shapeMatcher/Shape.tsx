import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  id: string;
  backgroundUrl: string;
};

export const Shape = ({ id, backgroundUrl }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, data: { origin: "pool" } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundImage: `url(${backgroundUrl})`,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="px-4 py-2 w-[80px] lg:w-[120px] xl:w-[140px] 2xl:w-[140px] h-[80px] lg:h-[120px] xl:h-[140px] 2xl:h-[140px] bg-cover bg-center rounded-md border border-gray-300 shadow-sm cursor-grab select-none text-center"
    />
  );
};
