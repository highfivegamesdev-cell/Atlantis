import type { PropsWithChildren } from "react";

interface Props {
  backgroundUrl: string;
}

export const SceneWrapper = ({
  backgroundUrl,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-900 overflow-hidden">
      <div
        className="w-[768px] h-[432px] lg:w-[1024px] lg:h-[576px] xl:w-[1280px] xl:h-[720px] 2xl:w-[1536px] 2xl:h-[864px] bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      >
        {children}
      </div>
    </div>
  );
};
