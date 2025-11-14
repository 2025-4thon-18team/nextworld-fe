import { FC } from "react";
import { cn } from "@/utils";
import { IconCross } from "@/assets/icons";
import {
  CategoryTabs,
  CategoryTabsTab,
} from "@/components/CategoryTabs/CategoryTabs";
import { TagList } from "@/components/TagList/TagList";
import { StickerCard } from "@/components/StickerCard/StickerCard";
import { GuidelineCategoryTab } from "../CategoryTabs/CategoryTabs";

interface GuidelineSidebarProps {
  title: string;
  onClose?: () => void;
  className?: string;
  categoryTab?: "내 작품" | "원작";
  onCategoryTabChange?: (tab: "내 작품" | "원작") => void;
  forbiddenWords?: string[];
  sections?: Array<{
    title: string;
    content: string;
  }>;
}

export const GuidelineSidebar: FC<GuidelineSidebarProps> = ({
  title,
  onClose,
  className,
  categoryTab = "내 작품" as GuidelineCategoryTab,
  onCategoryTabChange,
  forbiddenWords = [],
  sections = [],
}) => {
  return (
    <div
      className={cn(
        "bg-background-subtle gap-lg flex h-890 w-442 flex-col items-start shadow-[-2px_1px_4px_0px_rgba(0,0,0,0.25)]",
        className,
      )}
    >
      {/* Header Section */}
      <div className="gap-md pt-lg relative flex w-full shrink-0 flex-col items-start bg-white px-32 pb-0">
        {/* Header */}
        <div className="relative flex w-full shrink-0 items-center justify-between">
          <p className="text-body-medium tracking-tight text-nowrap whitespace-pre text-black">
            {title}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="flex size-24 items-center justify-center overflow-hidden"
          >
            <IconCross className="size-24 shrink-0 overflow-hidden" />
          </button>
        </div>

        {/* CategoryTabs for guideline */}
        <CategoryTabs
          activeTab={categoryTab}
          onTabChange={(tab: CategoryTabsTab) =>
            onCategoryTabChange?.(tab as GuidelineCategoryTab)
          }
          variant="editor"
          className="h-48"
        />
      </div>

      {/* Content Section */}
      <div className="gap-md relative flex min-h-px w-full min-w-px shrink-0 grow basis-0 flex-col items-start px-32 py-0">
        {/* 금지어 */}
        <div className="px-sm flex w-full shrink-0 flex-col items-start gap-10 rounded-sm bg-white py-4">
          <div className="flex items-center justify-center gap-3 px-4 py-0">
            <p className="text-body-medium tracking-tight text-nowrap whitespace-pre text-black">
              금지어
            </p>
          </div>
        </div>
        <TagList tags={forbiddenWords} />

        {/* 섹션들 */}
        {sections.map((section, index) => (
          <div key={index} className="gap-md flex w-full flex-col items-start">
            <div className="px-sm flex w-full shrink-0 flex-col items-start gap-10 rounded-sm bg-white py-4">
              <div className="flex items-center justify-center gap-3 px-4 py-0">
                <p className="text-body-medium tracking-tight text-nowrap whitespace-pre text-black">
                  {section.title}
                </p>
              </div>
            </div>
            <StickerCard variant="primary">{section.content}</StickerCard>
          </div>
        ))}
      </div>
    </div>
  );
};
