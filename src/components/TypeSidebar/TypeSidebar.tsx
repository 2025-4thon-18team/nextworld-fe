import { FC } from "react";
import { cn } from "@/utils";
import { IconCross } from "@/assets/icons";
import { RadioButton } from "@/components/RadioButton/RadioButton";
import { SeriesCardSmall } from "@/components/SeriesCardSmall/SeriesCardSmall";
import { AddSeries } from "@/components/AddSeries/AddSeries";
import { Search } from "@/components/Search/Search";
import { TagList } from "@/components/TagList/TagList";
import { ToggleButton } from "@/components/ToggleButton/ToggleButton";
import { InputLabel, TextInput } from "@/components/Input/Input";
import { HomeCategory } from "@/components/HomeCategory/HomeCategory";

interface TypeSidebarProps {
  title: string;
  onClose?: () => void;
  postSelected?: boolean;
  onPostChange?: (selected: boolean) => void;
  paidPost?: boolean;
  onPaidPostChange?: (checked: boolean) => void;
  episodePrice?: string;
  onEpisodePriceChange?: (value: string) => void;
  tags?: string[];
  allowDerivative?: boolean;
  onAllowDerivativeChange?: (checked: boolean) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  series?: Array<{ imageUrl: string; title: string; id?: string }>;
  selectedSeriesId?: string;
  onSeriesSelect?: (index: number) => void;
  onAddSeries?: () => void;
  categoryTab?: "내 작품" | "원작";
  onCategoryTabChange?: (tab: "내 작품" | "원작") => void;
  variant?: "post" | "series" | "post-secondary";
  className?: string;
}

export const TypeSidebar: FC<TypeSidebarProps> = ({
  title,
  onClose,
  postSelected = true,
  onPostChange,
  paidPost = false,
  onPaidPostChange,
  episodePrice = "",
  onEpisodePriceChange,
  tags = [],
  allowDerivative = false,
  onAllowDerivativeChange,
  searchValue = "",
  onSearchChange,
  series = [],
  selectedSeriesId,
  onSeriesSelect,
  onAddSeries,
  categoryTab = "내 작품",
  onCategoryTabChange,
  variant = "post",
  className,
}) => {
  const renderContent = () => {
    if (variant === "series") {
      return (
        <div className="gap-md relative flex w-full shrink-0 flex-col items-start">
          {onCategoryTabChange && (
            <HomeCategory
              activeTab={categoryTab}
              onTabChange={(tab) =>
                onCategoryTabChange(tab as "내 작품" | "원작")
              }
              variant="editor"
              className="w-full"
            />
          )}
          <div className="gap-lg relative flex w-full shrink-0 flex-wrap items-start justify-between">
            {series.map((item, index) => (
              <SeriesCardSmall
                key={item.id || index}
                imageUrl={item.imageUrl}
                title={item.title}
                selected={selectedSeriesId === (item.id || String(index))}
                onClick={() => onSeriesSelect?.(index)}
              />
            ))}
            <AddSeries onClick={onAddSeries} />
          </div>
        </div>
      );
    }

    if (variant === "post-secondary") {
      return (
        <div className="gap-lg relative flex w-full shrink-0 flex-col items-start">
          <div className="flex w-full items-center justify-between relative shrink-0">
            <InputLabel>유료 포스트</InputLabel>
            <ToggleButton
              checked={paidPost}
              onChange={onPaidPostChange}
            />
          </div>
          <div className="gap-sm relative flex w-full shrink-0 flex-col items-start">
            <InputLabel>회차 가격 입력</InputLabel>
            <TextInput
              placeholder="placeholder"
              value={episodePrice}
              onChange={(e) => onEpisodePriceChange?.(e.target.value)}
            />
            <p className="text-body-small-medium text-muted text-center text-nowrap tracking-tight whitespace-pre">
              원작이 있을 경우, 정산 비율은 4:3:3으로 고정 됩니다
            </p>
          </div>
          <div className="gap-sm relative flex w-full shrink-0 flex-col items-start">
            <InputLabel>태그</InputLabel>
            <div className="border-sm border-grayscale-g2 bg-white flex items-start gap-10 rounded-md px-lg py-md w-full">
              <TagList tags={tags} />
            </div>
          </div>
          <div className="flex w-full items-center justify-between relative shrink-0">
            <InputLabel>2차 창작</InputLabel>
            <ToggleButton
              checked={allowDerivative}
              onChange={onAllowDerivativeChange}
            />
          </div>
          <Search
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full"
          />
          <div className="gap-lg relative flex w-full shrink-0 flex-wrap items-start justify-between">
            {series.map((item, index) => (
              <SeriesCardSmall
                key={item.id || index}
                imageUrl={item.imageUrl}
                title={item.title}
                selected={selectedSeriesId === (item.id || String(index))}
                onClick={() => onSeriesSelect?.(index)}
              />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="gap-lg relative flex w-full shrink-0 flex-col items-start">
        <div className="flex w-full items-center justify-between relative shrink-0">
          <InputLabel>유료 포스트</InputLabel>
          <ToggleButton
            checked={paidPost}
            onChange={onPaidPostChange}
          />
        </div>
        <div className="gap-sm relative flex w-full shrink-0 flex-col items-start">
          <InputLabel>회차 가격 입력</InputLabel>
          <TextInput
            placeholder="placeholder"
            value={episodePrice}
            onChange={(e) => onEpisodePriceChange?.(e.target.value)}
          />
          <p className="text-body-small-medium text-muted text-center text-nowrap tracking-tight whitespace-pre">
            원작이 있을 경우, 정산 비율은 4:3:3으로 고정 됩니다
          </p>
        </div>
        <div className="gap-sm relative flex w-full shrink-0 flex-col items-start">
          <InputLabel>태그</InputLabel>
          <div className="border-sm border-grayscale-g2 bg-white flex items-start gap-10 rounded-md px-lg py-md w-full">
            <TagList tags={tags} />
          </div>
        </div>
        <div className="flex w-full items-center justify-between relative shrink-0">
          <InputLabel>2차 창작</InputLabel>
          <ToggleButton
            checked={allowDerivative}
            onChange={onAllowDerivativeChange}
          />
        </div>
      </div>
    );
  };

  return (
    <div
      className={cn(
        "bg-background-subtle flex h-1175 items-start gap-10 shadow-[-2px_1px_4px_0px_rgba(0,0,0,0.25)] w-374",
        className,
      )}
    >
      <div className="flex flex-col gap-8 grow shrink-0 min-h-px min-w-px px-32 py-0 relative w-full">
        {/* Header */}
        <div className="bg-white flex flex-col gap-md items-start pb-md pt-lg px-32 relative shrink-0 w-full">
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
          {(variant === "post" || variant === "post-secondary") && (
            <div className="relative flex w-full shrink-0 items-center gap-2">
              <RadioButton
                selected={postSelected}
                onClick={() => onPostChange?.(true)}
              >
                포스트
              </RadioButton>
              <RadioButton
                selected={!postSelected}
                onClick={() => onPostChange?.(false)}
              >
                작품 연재
              </RadioButton>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-lg grow shrink-0 min-h-px min-w-px px-32 py-0 relative w-full">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

