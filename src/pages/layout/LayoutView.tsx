import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Gnb } from "@/components/Gnb/Gnb";

type Props = {
  activeMenu?: "홈" | "작품" | "포스트";
  onMenuClick: (menu: "홈" | "작품" | "포스트") => void;
};

export const LayoutView: FC<Props> = ({ activeMenu, onMenuClick }) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <Gnb activeMenu={activeMenu} onMenuClick={onMenuClick} />
      <main className="mx-auto w-full max-w-1280 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};
