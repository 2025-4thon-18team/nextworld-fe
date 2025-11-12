import { FC } from "react";
import { cn } from "@/utils";

type HomeCategoryTab = "홈" | "신규" | "관심" | "내 작품" | "원작";

interface HomeCategoryProps {
  activeTab: HomeCategoryTab;
  onTabChange: (tab: HomeCategoryTab) => void;
  variant?: "home" | "editor";
  className?: string;
}

export const HomeCategory: FC<HomeCategoryProps> = ({
  activeTab,
  onTabChange,
  variant = "home",
  className,
}) => {
  const tabs: HomeCategoryTab[] =
    variant === "editor" ? ["내 작품", "원작"] : ["홈", "신규", "관심"];

  return (
    <div className={cn("flex h-48 items-center", className)}>
      {tabs.map((tab) => {
        const isSelected = activeTab === tab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={cn(
              "gap-sm flex h-full min-h-40 min-w-50 flex-col items-center justify-center px-lg py-0",
              isSelected
                ? "border-b-md border-black border-t-0 border-r-0 border-l-0 border-solid"
                : "",
            )}
          >
            <p
              className={cn(
                "text-headings-heading-1 text-center text-nowrap tracking-tight whitespace-pre",
                isSelected ? "text-black" : "text-text-subtle",
              )}
            >
              {tab}
            </p>
          </button>
        );
      })}
    </div>
  );
};

