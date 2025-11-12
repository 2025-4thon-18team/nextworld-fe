import { FC, ReactNode } from "react";
import { cn } from "@/utils";
import { HomeCategory } from "@/components/HomeCategory/HomeCategory";

type HomeCategoryTab = "홈" | "신규" | "관심";

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
    <div className={cn("flex size-full flex-col bg-white", className)}>
      {/* Home Category */}
      <HomeCategory
        activeTab={activeTab}
        onTabChange={onTabChange}
        className={cn("flex h-48 items-center", categoryClassName)}
      />

      {/* Main Content */}
      {contentClassName ? (
        <div className={cn("flex items-start", contentClassName)}>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

