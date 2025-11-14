import { FC } from "react";
import { cn } from "@/utils";
import { IconCross } from "@/assets/icons";
import {
  CategoryTabs,
  PostTypeCategoryTab,
} from "@/components/CategoryTabs/CategoryTabs";
import { SearchWorkAutocomplete } from "@/components/SearchWorkAutocomplete/SearchWorkAutocomplete";
import { ToggleButton } from "@/components/ToggleButton/ToggleButton";
import { InputLabel, TagsInput, TextInput } from "@/components/Input/Input";
import { SeriesCardSmall } from "@/components/SeriesCardSmall/SeriesCardSmall";
import { AddSeries } from "@/components/AddSeries/AddSeries";
import type { WorkResponseDto } from "@/querys/types";

interface PostTypeSidebarProps {
  title: string;
  onClose?: () => void;
  className?: string;
  // Post Type props
  postTypeTab?: "포스트" | "작품 연재";
  onPostTypeTabChange?: (tab: "포스트" | "작품 연재") => void;
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onWorkSelect?: (work: WorkResponseDto) => void;
  series?: Array<{
    imageUrl: string;
    title: string;
    id?: string;
    selected?: boolean;
  }>;
  onSeriesClick?: (index: number) => void;
  selectedPostWorkId?: string | number;
  selectedEpisodeWorkId?: string | number;
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
  onWorkSelect,
  series = [],
  onSeriesClick,
  selectedPostWorkId,
  selectedEpisodeWorkId,
  paidPostEnabled = false,
  onPaidPostChange,
  priceValue = "",
  onPriceChange,
  tags = [],
  onAddSeries,
  variant = "post-type",
  onTagsChange,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onCategoryTabChange: _,
}) => {
  // post-type
  if (variant === "post-type") {
    const isEpisodeTab = postTypeTab === "작품 연재";

    return (
      <div className="bg-background-subtle gap-md absolute top-0 right-0 flex h-full w-374 shrink-0 flex-col items-start shadow-[-2px_1px_4px_0px_rgba(0,0,0,0.25)]">
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

        {/* 포스트 탭일 때: 원작 설정, 검색, 유료 포스트, 태그 */}
        {!isEpisodeTab && (
          <>
            {/* 원작 설정 */}
            <InputLabel>원작 설정</InputLabel>

            {/* 검색 - 작품 자동완성 */}
            <SearchWorkAutocomplete
              value={searchValue}
              onChange={onSearchChange}
              onWorkSelect={onWorkSelect}
              selectedWorkId={selectedPostWorkId}
              className="w-full"
            />

            {/* 작품 카드들 - Horizontal List */}
            {series.length > 0 && (
              <div className="gap-md relative flex w-full shrink-0 overflow-x-auto">
                {series.map((item, index) => {
                  // 포스트 탭에서는 selectedPostWorkId를 기준으로 선택 상태 결정
                  const seriesId = series[index]?.id || String(index);
                  const isSelected =
                    selectedPostWorkId !== undefined &&
                    String(seriesId) === String(selectedPostWorkId);
                  return (
                    <SeriesCardSmall
                      key={index}
                      imageUrl={item.imageUrl}
                      title={item.title}
                      selected={isSelected}
                      onClick={() => onSeriesClick?.(index)}
                    />
                  );
                })}
              </div>
            )}

            {/* 유료 포스트 */}
            <div className="relative flex w-full shrink-0 items-center justify-between">
              <InputLabel>유료 포스트</InputLabel>
              <ToggleButton
                checked={paidPostEnabled}
                onChange={onPaidPostChange}
              />
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
          </>
        )}

        {/* 작품 연재 탭일 때: 작품 선택만 */}
        {isEpisodeTab && (
          <div className="gap-md relative flex w-full shrink-0 flex-col items-start px-32 py-0">
            {/* 작품 카드들 */}
            <div className="gap-md relative flex w-full shrink-0 flex-wrap items-start justify-between">
              {series.map((item, index) => {
                // 작품 연재 탭에서는 selectedEpisodeWorkId를 기준으로 선택 상태 결정
                const seriesId = series[index]?.id || String(index);
                const isSelected =
                  selectedEpisodeWorkId !== undefined &&
                  String(seriesId) === String(selectedEpisodeWorkId);
                return (
                  <SeriesCardSmall
                    key={index}
                    imageUrl={item.imageUrl}
                    title={item.title}
                    selected={isSelected}
                    onClick={() => onSeriesClick?.(index)}
                  />
                );
              })}
              {onAddSeries && <AddSeries onClick={onAddSeries} />}
            </div>
          </div>
        )}
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
