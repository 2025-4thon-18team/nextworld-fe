import { FC, useMemo } from "react";
import { cn } from "@/utils";
import { useIsAuthenticated } from "@/querys/useAuth";

export type TabsVariant = "home" | "guideline" | "post-type";
export type HomeCategoryTab = "홈" | "신규" | "관심";
export type GuidelineCategoryTab = "내 작품" | "원작";
export type PostTypeCategoryTab = "포스트" | "작품 연재";
interface CategoryTabsProps {
  variant?: TabsVariant;
  className?: string;
  activeTab: HomeCategoryTab | GuidelineCategoryTab | PostTypeCategoryTab;
  onTabChange: (
    tab: HomeCategoryTab | GuidelineCategoryTab | PostTypeCategoryTab,
  ) => void;
}

export const CategoryTabs: FC<CategoryTabsProps> = ({
  variant = "home" as TabsVariant,
  className,
  activeTab,
  onTabChange,
}) => {
  const isAuthenticated = useIsAuthenticated();
  
  const tabs = useMemo(() => {
    if (variant === "home") {
      // 로그인 상태에서만 관심 탭 표시
      return isAuthenticated ? ["홈", "신규", "관심"] : ["홈", "신규"];
    } else if (variant === "guideline") {
      return ["내 작품", "원작"];
    } else if (variant === "post-type") {
      return ["포스트", "작품 연재"];
    }
    return [];
  }, [variant, isAuthenticated]);
  return (
    <div className={cn("flex h-48 items-center", className)}>
      {tabs.map((tab) => {
        const isSelected = activeTab === tab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() =>
              onTabChange(
                tab as HomeCategoryTab | GuidelineCategoryTab | PostTypeCategoryTab,
              )
            }
            className={cn(
              "gap-sm px-lg flex h-full min-h-40 min-w-50 flex-col items-center justify-center py-0",
              isSelected
                ? "border-b-md border-t-0 border-r-0 border-l-0 border-solid border-black"
                : "",
            )}
          >
            <p
              className={cn(
                "text-headings-heading-1 text-center tracking-tight text-nowrap whitespace-pre",
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
