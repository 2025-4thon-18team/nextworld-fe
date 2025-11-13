import { FC } from "react";
import { cn } from "@/utils";
import { IconCross } from "@/assets/icons";
import { HomeCategory } from "@/components/HomeCategory/HomeCategory";
import { Search } from "@/components/Search/Search";
import { ToggleButton } from "@/components/ToggleButton/ToggleButton";
import { InputLabel, TextInput } from "@/components/Input/Input";
import { TagList } from "@/components/TagList/TagList";
import { SeriesCardSmall } from "@/components/SeriesCardSmall/SeriesCardSmall";
import { AddSeries } from "@/components/AddSeries/AddSeries";
import { StickerCard } from "@/components/StickerCard/StickerCard";

type EditorSidebarVariant = "post-type" | "series-type" | "guideline";

interface EditorSidebarProps {
  variant: EditorSidebarVariant;
  title: string;
  onClose?: () => void;
  className?: string;
}

// Post Type Variant Props
interface PostTypeProps {
  postTypeTab?: "포스트" | "작품 연재";
  onPostTypeTabChange?: (tab: "포스트" | "작품 연재") => void;
  originalSelected?: boolean;
  onOriginalChange?: (selected: boolean) => void;
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  series?: Array<{ imageUrl: string; title: string; selected?: boolean }>;
  onSeriesClick?: (index: number) => void;
  paidPostEnabled?: boolean;
  onPaidPostChange?: (enabled: boolean) => void;
  priceValue?: string;
  onPriceChange?: (value: string) => void;
  tags?: string[];
}

// Series Type Variant Props
interface SeriesTypeProps {
  postTypeTab?: "포스트" | "작품 연재";
  onPostTypeTabChange?: (tab: "포스트" | "작품 연재") => void;
  series?: Array<{ imageUrl: string; title: string; selected?: boolean }>;
  onSeriesClick?: (index: number) => void;
  onAddSeries?: () => void;
}

// Guideline Variant Props
interface GuidelineProps {
  categoryTab?: "내 작품" | "원작";
  onCategoryTabChange?: (tab: "내 작품" | "원작") => void;
  forbiddenWords?: string[];
  sections?: Array<{
    title: string;
    content: string;
  }>;
}

export const EditorSidebar: FC<
  EditorSidebarProps &
    Partial<PostTypeProps & SeriesTypeProps & GuidelineProps>
> = ({
  variant,
  title,
  onClose,
  className,
  // Post Type props
  postTypeTab = "포스트",
  onPostTypeTabChange,
  originalSelected = false,
  onOriginalChange,
  searchValue = "",
  onSearchChange,
  series = [],
  onSeriesClick,
  paidPostEnabled = false,
  onPaidPostChange,
  priceValue = "",
  onPriceChange,
  tags = [],
  // Series Type props
  onAddSeries,
  // Guideline props
  categoryTab = "내 작품",
  onCategoryTabChange,
  forbiddenWords = [],
  sections = [],
}) => {
  const getHeight = () => {
    switch (variant) {
      case "series-type":
        return "h-1175";
      case "guideline":
        return "h-890";
      default:
        return "h-1175";
    }
  };

  const getWidth = () => {
    switch (variant) {
      case "guideline":
        return "w-442";
      default:
        return "w-374";
    }
  };

  const renderContent = () => {
    switch (variant) {
      case "post-type":
        return (
          <div className="flex flex-col gap-md items-start relative shrink-0 w-full h-1059">
            {/* 원작 설정 */}
            <div className="flex items-center justify-between relative shrink-0 w-full">
              <InputLabel>원작 설정</InputLabel>
              <ToggleButton
                checked={originalSelected}
                onChange={onOriginalChange}
              />
            </div>

            {/* 검색 */}
            <Search
              value={searchValue}
              onChange={onSearchChange}
              className="w-full"
            />

            {/* 작품 카드들 */}
            <div className="flex flex-wrap gap-md items-start justify-between relative shrink-0 w-full">
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
            <div className="flex items-center justify-between relative shrink-0 w-full">
              <InputLabel>유료 포스트</InputLabel>
              <ToggleButton
                checked={paidPostEnabled}
                onChange={onPaidPostChange}
              />
            </div>

            {/* 회차 가격 입력 */}
            {paidPostEnabled && (
              <div className="flex flex-col gap-sm items-start relative shrink-0 w-full">
                <InputLabel>회차 가격 입력</InputLabel>
                <TextInput
                  value={priceValue}
                  onChange={(e) => onPriceChange?.(e.target.value)}
                  placeholder="placeholder"
                />
                <p className="text-body-small-medium text-muted text-center text-nowrap tracking-tight whitespace-pre">
                  원작이 있을 경우, 정산 비율은 4:3:3으로 고정 됩니다
                </p>
              </div>
            )}

            {/* 태그 */}
            <div className="flex flex-col gap-sm items-start relative shrink-0 w-full">
              <InputLabel>태그</InputLabel>
              <div className="border-sm border-grayscale-g2 flex items-start gap-10 px-lg py-md rounded-md shrink-0 w-full">
                <TagList tags={tags} />
              </div>
            </div>
          </div>
        );

      case "series-type":
        return (
          <div className="flex flex-col gap-md items-start relative shrink-0 w-full">
            {/* 작품 카드들 */}
            <div className="flex flex-wrap gap-md items-start justify-between relative shrink-0 w-full">
              {series.map((item, index) => (
                <SeriesCardSmall
                  key={index}
                  imageUrl={item.imageUrl}
                  title={item.title}
                  selected={item.selected}
                  onClick={() => onSeriesClick?.(index)}
                />
              ))}
              <AddSeries onClick={onAddSeries} />
            </div>
          </div>
        );

      case "guideline":
        return (
          <div className="flex flex-col gap-md items-start relative shrink-0 w-full">
            {/* 금지어 */}
            <div className="bg-white flex flex-col gap-10 items-start px-sm py-4 rounded-sm shrink-0 w-full">
              <div className="flex items-center justify-center gap-3 px-4 py-0">
                <p className="text-body-medium tracking-tight text-nowrap whitespace-pre text-black">
                  금지어
                </p>
              </div>
            </div>
            <TagList tags={forbiddenWords} />

            {/* 섹션들 */}
            {sections.map((section, index) => (
              <div
                key={index}
                className="flex flex-col gap-md items-start w-full"
              >
                <div className="bg-white flex flex-col gap-10 items-start px-sm py-4 rounded-sm shrink-0 w-full">
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
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "bg-background-subtle flex flex-col items-start gap-lg shadow-[-2px_1px_4px_0px_rgba(0,0,0,0.25)]",
        getHeight(),
        getWidth(),
        className,
      )}
    >
      {/* Header Section */}
      <div className="bg-white flex flex-col gap-md items-start pb-0 pt-lg px-32 relative shrink-0 w-full">
        {/* Header */}
        <div className="flex items-center justify-between relative shrink-0 w-full">
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

        {/* HomeCategory for post-type and series-type */}
        {(variant === "post-type" || variant === "series-type") && (
          <HomeCategory
            activeTab={postTypeTab}
            onTabChange={(tab) =>
              onPostTypeTabChange?.(tab as "포스트" | "작품 연재")
            }
            variant="post-series"
            className="h-48"
          />
        )}

        {/* HomeCategory for guideline */}
        {variant === "guideline" && (
          <HomeCategory
            activeTab={categoryTab}
            onTabChange={(tab) =>
              onCategoryTabChange?.(tab as "내 작품" | "원작")
            }
            variant="editor"
            className="h-48"
          />
        )}
      </div>

      {/* Content Section */}
      <div className="basis-0 flex flex-col gap-md grow items-start min-h-px min-w-px px-32 py-0 relative shrink-0 w-full">
        {renderContent()}
      </div>
    </div>
  );
};

