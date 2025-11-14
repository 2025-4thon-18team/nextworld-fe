import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Gnb } from "@/components/Gnb/Gnb";

type Props = {
  activeMenu?: "홈" | "작품" | "포스트";
  onMenuClick: (menu: "홈" | "작품" | "포스트") => void;
};

export const LayoutView: FC<Props> = () => {
  return (
    <div className="flex w-full flex-col bg-white">
      <Gnb />
      <main className="mx-auto w-full max-w-1280 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};
