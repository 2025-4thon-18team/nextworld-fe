import { FC, ReactNode } from "react";
import { cn } from "@/utils";
import {
  CategoryTabs,
  HomeCategoryTab,
} from "@/components/CategoryTabs/CategoryTabs";
import { Outlet } from "react-router-dom";

interface HomeLayoutViewProps {
  className?: string;
  activeTab: HomeCategoryTab;
  onTabChange: (tab: HomeCategoryTab) => void;
  categoryClassName?: string;
  contentClassName?: string;
  children: ReactNode;
}

export const HomeLayoutView: FC<HomeLayoutViewProps> = ({
  className,
  activeTab,
  onTabChange,
  categoryClassName,
  contentClassName,
  children,
}) => {
  return (
    <div
      className={cn("flex size-full min-h-screen flex-col bg-white", className)}
    >
      <div className="flex h-20 w-full shrink-0 items-center justify-center">
        {/* Home Category */}
        <CategoryTabs
          variant="home"
          activeTab={activeTab}
          onTabChange={
            onTabChange as (
              tab:
                | HomeCategoryTab
                | import("@/components/CategoryTabs/CategoryTabs").GuidelineCategoryTab
                | import("@/components/CategoryTabs/CategoryTabs").PostTypeCategoryTab,
            ) => void
          }
          className={cn("flex h-48 items-center", categoryClassName)}
        />
      </div>

      {/* Main Content */}
      <div className={cn("flex items-start", contentClassName)}>
        {children}
        <Outlet />
      </div>
    </div>
  );
};
