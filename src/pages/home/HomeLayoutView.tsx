import { FC, ReactNode } from "react";
import { cn } from "@/utils";
import { CategoryTabs } from "@/components/CategoryTabs/CategoryTabs";
import { Outlet } from "react-router-dom";

type CategoryTabsTab = "홈" | "신규" | "관심";

interface HomeLayoutViewProps {
  className?: string;
  activeTab: CategoryTabsTab;
  onTabChange: (tab: CategoryTabsTab) => void;
  categoryClassName?: string;
  contentClassName?: string;
  children: ReactNode;
}

export const HomeLayoutView: FC<Props> = ({ className }) => {
  return (
    <div
      className={cn("flex size-full min-h-screen flex-col bg-white", className)}
    >
      <div className="flex h-20 w-full shrink-0 items-center justify-center">
        {/* Home Category */}
        <CategoryTabs
          activeTab={
            activeTab as
              | "홈"
              | "신규"
              | "관심"
              | "내 작품"
              | "원작"
              | "포스트"
              | "작품 연재"
          }
          onTabChange={
            onTabChange as (
              tab:
                | "홈"
                | "신규"
                | "관심"
                | "내 작품"
                | "원작"
                | "포스트"
                | "작품 연재",
            ) => void
          }
          className="flex h-48 items-center"
        />

        {/* Main Content */}
        <div className={cn("flex items-start", contentClassName)}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
