import { twMerge } from "tailwind-merge";

type Props = {
  image: string;
  alt: string;
  className: string;
  action: () => void;
};

export const PuzzleTrigger = ({ image, alt, className, action }: Props) => {
  const baseClass =
    "absolute hover:cursor-pointer border border-transparent hover:border-teal-200 duration-300 hover:shadow-[0_0_20px_rgba(20,184,166,0.8)] transition";

  return (
    <button className={twMerge(baseClass, className)} onClick={action}>
      <img src={image} className="w-full h-auto" alt={alt} />
    </button>
  );
};
