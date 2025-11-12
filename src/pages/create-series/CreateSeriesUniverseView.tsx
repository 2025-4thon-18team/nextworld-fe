import { FC } from "react";
import { TextAreaInputList } from "@/components/TextAreaInputList/TextAreaInputList";
import { ToggleButton } from "@/components/ToggleButton/ToggleButton";
import { InputLabel, TextInput } from "@/components/Input/Input";
import { IconChevron } from "@/assets/icons";
import Button from "@/components/Button/Button";
import { Search } from "@/components/Search/Search";
import { SeriesCardSmall } from "@/components/SeriesCardSmall/SeriesCardSmall";
import { cn } from "@/utils";

type StepType = "기본 설정" | "유니버스 설정" | "2차 창작 설정";

type Props = {
  activeStep: StepType;
  originalSeriesSearch: string;
  originalSeriesList: Array<{ id: string; imageUrl: string; title: string }>;
  selectedOriginalSeriesId?: string;
  worldviewTextAreas: string[];
  paidSeries: boolean;
  episodePrice: string;
  onStepChange: (step: StepType) => void;
  onOriginalSeriesSearchChange: (value: string) => void;
  onOriginalSeriesSelect: (id: string) => void;
  onWorldviewTextAreasChange: (textAreas: string[]) => void;
  onPaidSeriesChange: (checked: boolean) => void;
  onEpisodePriceChange: (value: string) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export const CreateSeriesUniverseView: FC<Props> = ({
  activeStep,
  originalSeriesSearch,
  originalSeriesList,
  selectedOriginalSeriesId,
  worldviewTextAreas,
  paidSeries,
  episodePrice,
  onStepChange,
  onOriginalSeriesSearchChange,
  onOriginalSeriesSelect,
  onWorldviewTextAreasChange,
  onPaidSeriesChange,
  onEpisodePriceChange,
  onPrevious,
  onNext,
}) => {
  return (
    <div className="relative min-h-screen w-full bg-white">
      {/* Step Indicator */}
      <div className="gap-xs flex flex-col items-center justify-center px-162 pt-100">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onStepChange("기본 설정")}
            className={cn(
              "text-headings-heading-4",
              activeStep === "기본 설정"
                ? "text-foreground-default"
                : "text-black",
            )}
          >
            기본 설정
          </button>
          <IconChevron className="size-24 rotate-270" />
          <button
            type="button"
            onClick={() => onStepChange("유니버스 설정")}
            className={cn(
              "text-body-regular",
              activeStep === "유니버스 설정"
                ? "text-foreground-default"
                : "text-black",
            )}
          >
            유니버스 설정
          </button>
          <IconChevron className="size-24 rotate-270" />
          <button
            type="button"
            onClick={() => onStepChange("2차 창작 설정")}
            className={cn(
              "text-body-regular",
              activeStep === "2차 창작 설정"
                ? "text-foreground-default"
                : "text-black",
            )}
          >
            2차 창작 설정
          </button>
        </div>
      </div>

      <div className="gap-xl flex flex-col items-start px-200 pt-50">
        <p className="text-headings-heading-2 tracking-tight text-black">
          작품 생성 중
        </p>

        {/* Universe Settings */}
        <div className="gap-xl flex w-810 flex-col items-start">
          {/* Original Series Selection */}
          <div className="gap-lg flex w-full flex-col items-start">
            <div className="gap-sm flex w-full flex-col items-start">
              <InputLabel>원작 설정</InputLabel>
              <Search
                value={originalSeriesSearch}
                onChange={(e) => onOriginalSeriesSearchChange(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="gap-lg flex items-center">
              {originalSeriesList.map((series) => (
                <SeriesCardSmall
                  key={series.id}
                  imageUrl={series.imageUrl}
                  title={series.title}
                  selected={selectedOriginalSeriesId === series.id}
                  onClick={() => onOriginalSeriesSelect(series.id)}
                />
              ))}
            </div>
          </div>

          {/* Worldview Description */}
          <TextAreaInputList
            title="세계관 설명"
            textAreas={worldviewTextAreas}
            onTextAreasChange={onWorldviewTextAreasChange}
            className="opacity-100"
          />

          {/* Paid Series Toggle */}
          <div className="gap-xl flex w-full flex-col items-start">
            <div className="flex w-full items-center justify-between">
              <InputLabel>유료 연재</InputLabel>
              <ToggleButton checked={paidSeries} onChange={onPaidSeriesChange} />
            </div>

            {/* Episode Price Input */}
            {paidSeries && (
              <div className="gap-sm flex h-107 w-full flex-col items-start">
                <InputLabel required>회차 가격 입력</InputLabel>
                <TextInput
                  placeholder="placeholder"
                  value={episodePrice}
                  onChange={(e) => onEpisodePriceChange(e.target.value)}
                />
                <p className="text-body-small-medium text-muted">
                  원작이 있을 경우, 정산 비율은 4:3:3으로 고정 됩니다
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex w-full items-center justify-center gap-12 pb-33">
          <Button variant="subtle" className="flex-1" onClick={onPrevious}>
            이전 단계
          </Button>
          <Button variant="default" className="flex-1" onClick={onNext}>
            다음 단계
          </Button>
        </div>
      </div>
    </div>
  );
};

