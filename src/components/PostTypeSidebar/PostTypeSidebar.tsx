import { FC } from "react";
import { cn } from "@/utils";
import { IconCross } from "@/assets/icons";
import {
  CategoryTabs,
  CategoryTabsTab,
  PostTypeCategoryTab,
} from "@/components/CategoryTabs/CategoryTabs";
import { Search } from "@/components/Search/Search";
import { ToggleButton } from "@/components/ToggleButton/ToggleButton";
import { InputLabel, TagsInput, TextInput } from "@/components/Input/Input";
import { SeriesCardSmall } from "@/components/SeriesCardSmall/SeriesCardSmall";
import { AddSeries } from "@/components/AddSeries/AddSeries";

interface PostTypeSidebarProps {
  title: string;
  onClose?: () => void;
  className?: string;
  // Post Type props
  postTypeTab?: "포스트" | "작품 연재";
  onPostTypeTabChange?: (tab: "포스트" | "작품 연재") => void;
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  series?: Array<{ imageUrl: string; title: string; selected?: boolean }>;
  onSeriesClick?: (index: number) => void;
  paidPostEnabled?: boolean;
  onPaidPostChange?: (enabled: boolean) => void;
  priceValue?: string;
  onPriceChange?: (value: string) => void;
  tags?: string[];
  // Series Type props
  onAddSeries?: () => void;
  categoryTab?: "내 작품" | "원작";
  onCategoryTabChange?: (tab: "내 작품" | "원작") => void;
  variant?: "post-type" | "series-type";
  onTagsChange: (tags: string[]) => void;
}

export const PostTypeSidebar: FC<PostTypeSidebarProps> = ({
  title,
  onClose,
  className,
  postTypeTab = "포스트",
  onPostTypeTabChange,
  searchValue = "",
  onSearchChange,
  series = [],
  onSeriesClick,
  paidPostEnabled = false,
  onPaidPostChange,
  priceValue = "",
  onPriceChange,
  tags = [],
  onAddSeries,
  variant = "post-type",
  onTagsChange,
  onCategoryTabChange,
}) => {
  // post-type
  if (variant === "post-type") {
    return (
      <div className="gap-md absolute top-0 right-0 flex w-fit max-w-442 shrink-0 flex-col items-start">
        {/* 원작 설정 */}
        <InputLabel>원작 설정</InputLabel>

        {/* 검색 */}
        <Search
          value={searchValue}
          onChange={onSearchChange}
          className="w-full"
        />

        {/* 작품 카드들 */}
        <div className="gap-md relative flex w-full shrink-0 flex-wrap items-start justify-between">
          {series.map((item, index) => (
            <SeriesCardSmall
              key={index}
              imageUrl={item.imageUrl}
              title={item.title}
              selected={item.selected}
              onClick={() => onSeriesClick?.(index)}
            />
          ))}
        </div>

        {/* 유료 포스트 */}
        <div className="relative flex w-full shrink-0 items-center justify-between">
          <InputLabel>유료 포스트</InputLabel>
          <ToggleButton checked={paidPostEnabled} onChange={onPaidPostChange} />
        </div>

        {/* 회차 가격 입력 */}
        {paidPostEnabled && (
          <div className="gap-sm relative flex w-full shrink-0 flex-col items-start">
            <InputLabel>회차 가격 입력</InputLabel>
            <TextInput
              value={priceValue}
              onChange={(e) => onPriceChange?.(e.target.value)}
              placeholder="placeholder"
            />
            <p className="text-body-small-medium text-text-muted text-center tracking-tight text-nowrap whitespace-pre">
              원작이 있을 경우, 정산 비율은 4:3:3으로 고정 됩니다
            </p>
          </div>
        )}

        {/* 태그 */}
        <div className="gap-sm relative flex w-full shrink-0 flex-col items-start">
          <InputLabel>태그</InputLabel>
          <TagsInput tags={tags} onTagsChange={onTagsChange} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-background-subtle gap-lg flex h-full w-374 flex-col items-start shadow-[-2px_1px_4px_0px_rgba(0,0,0,0.25)]",
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

        {/* CategoryTabs for post-type and series-type */}
        <CategoryTabs
          activeTab={postTypeTab as PostTypeCategoryTab}
          onTabChange={(tab) =>
            onPostTypeTabChange?.(tab as "포스트" | "작품 연재")
          }
          variant="post-type"
          className="h-48"
        />
      </div>

      {/* Content Section */}
      <div className="gap-md relative flex w-full min-w-px shrink-0 grow flex-col items-start px-32 py-0">
        {variant === "series-type" && (
          <div className="gap-md relative flex w-full shrink-0 flex-col items-start">
            {/* 작품 카드들 */}
            <div className="gap-md relative flex w-full shrink-0 flex-wrap items-start justify-between">
              {series.map((item, index) => (
                <SeriesCardSmall
                  key={index}
                  imageUrl={item.imageUrl}
                  title={item.title}
                  selected={item.selected}
                  onClick={() => onSeriesClick?.(index)}
                />
              ))}
              {onAddSeries && <AddSeries onClick={onAddSeries} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
