import { FC } from "react";
import { LayoutView } from "./LayoutView";
import { useLayout } from "@/logic/useLayout";

export const Layout: FC = () => {
  const { activeMenu, onMenuClick } = useLayout();

  return <LayoutView activeMenu={activeMenu} onMenuClick={onMenuClick} />;
};
