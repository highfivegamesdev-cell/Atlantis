import type { PropsWithChildren } from "react";

interface Props {
  backgroundUrl: string;
}

export const SceneWrapper = ({
  backgroundUrl,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      {children}
    </div>
  );
};
