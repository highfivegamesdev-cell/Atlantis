type Props = {
  image: string;
  alt: string;
  positionTop: string;
  positionRight: string;
  action: () => void;
};

export const PuzzleTrigger = ({
  image,
  alt,
  positionTop,
  positionRight,
  action,
}: Props) => {
  const getTriggerClass = (posTop: string, posRight: string) => {
    const positionClass = `absolute top-[${posTop}] right-[${posRight}]`;
    const baseClass =
      "w-[10%] h-auto hover:cursor-pointer border border-transparent hover:border-teal-200 duration-300 hover:shadow-[0_0_20px_rgba(20,184,166,0.8)] transition";

    return `${positionClass} ${baseClass}`;
  };

  const triggerClass = getTriggerClass(positionTop, positionRight);

  return (
    <button className={triggerClass} onClick={action}>
      <img src={image} className="w-full h-auto" alt={alt} />
    </button>
  );
};
