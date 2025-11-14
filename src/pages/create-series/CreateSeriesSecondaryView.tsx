import { FC } from "react";
import { TextAreaInputList } from "@/components/TextAreaInputList/TextAreaInputList";
import { ToggleButton } from "@/components/ToggleButton/ToggleButton";
import { InputLabel, TagsInput } from "@/components/Input/Input";
import { IconChevron } from "@/assets/icons";
import Button from "@/components/Button/Button";
import { cn } from "@/utils";

type StepType = "기본 설정" | "유니버스 설정" | "2차 창작 설정";

type Props = {
  activeStep: StepType;
  allowSecondaryCreation: boolean;
  allowSecondaryRevenue: boolean;
  relationshipTextAreas: string[];
  contentTextAreas: string[];
  backgroundTextAreas: string[];
  prohibitedWords: string[];
  agreement1: boolean;
  agreement2: boolean;
  onStepChange: (step: StepType) => void;
  onAllowSecondaryCreationChange: (checked: boolean) => void;
  onAllowSecondaryRevenueChange: (checked: boolean) => void;
  onRelationshipTextAreasChange: (textAreas: string[]) => void;
  onContentTextAreasChange: (textAreas: string[]) => void;
  onBackgroundTextAreasChange: (textAreas: string[]) => void;
  onProhibitedWordsChange: (words: string[]) => void;
  onAgreement1Change: (checked: boolean) => void;
  onAgreement2Change: (checked: boolean) => void;
  onPrevious: () => void;
  onComplete: () => void;
};

export const CreateSeriesSecondaryView: FC<Props> = ({
  activeStep,
  allowSecondaryCreation,
  allowSecondaryRevenue,
  relationshipTextAreas,
  contentTextAreas,
  backgroundTextAreas,
  prohibitedWords,
  agreement1,
  agreement2,
  onStepChange,
  onAllowSecondaryCreationChange,
  onAllowSecondaryRevenueChange,
  onRelationshipTextAreasChange,
  onContentTextAreasChange,
  onBackgroundTextAreasChange,
  onProhibitedWordsChange,
  onAgreement1Change,
  onAgreement2Change,
  onPrevious,
  onComplete,
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

        {/* Secondary Creation Settings */}
        <div className="gap-xl flex w-full flex-col items-start">
          {/* Allow Secondary Creation */}
          <div className="flex w-full items-center justify-between">
            <InputLabel>2차 창작 허용</InputLabel>
            <ToggleButton
              checked={allowSecondaryCreation}
              onChange={onAllowSecondaryCreationChange}
            />
          </div>

          {/* Guidelines */}

          {allowSecondaryCreation && (
            <>
              <div className="gap-sm flex w-full flex-col items-start">
                <div className="gap-xs flex flex-col items-start">
                  <InputLabel>2차 창작 가이드라인</InputLabel>
                  <p className="text-body-small-medium text-text-muted pl-4">
                    2차 창작자가 지켜야할 가이드라인이 있다면 적어주세요!
                    <br />
                    (*가이드라인을 벗어나는 글은 AI 검증 후 반려됩니다.)
                  </p>
                </div>
              </div>

              <div className="flex w-full flex-col items-start gap-32 py-0 pr-0 pl-16">
                {/* Relationship Aspect */}
                <TextAreaInputList
                  title="관계/인물 측면"
                  textAreas={relationshipTextAreas}
                  onTextAreasChange={onRelationshipTextAreasChange}
                  className="opacity-100"
                  defaultExpanded={false}
                />

                {/* Content Aspect */}
                <TextAreaInputList
                  title="내용/스토리 측면"
                  textAreas={contentTextAreas}
                  onTextAreasChange={onContentTextAreasChange}
                  className="opacity-100"
                  defaultExpanded={false}
                />

                {/* Background Aspect */}
                <TextAreaInputList
                  title="배경/세계관 측면"
                  textAreas={backgroundTextAreas}
                  onTextAreasChange={onBackgroundTextAreasChange}
                  className="opacity-100"
                  defaultExpanded={false}
                />

                {/* Prohibited Words */}
                <div className="gap-lg flex w-full flex-col items-start">
                  <InputLabel>금지어</InputLabel>
                  <TagsInput
                    tags={prohibitedWords}
                    onTagsChange={onProhibitedWordsChange}
                  />
                </div>
              </div>
            </>
          )}
          {/* Agreements */}
          <div className="gap-lg flex w-366 flex-col items-start">
            <div className="gap-md flex items-center">
              <input
                type="checkbox"
                checked={agreement1}
                onChange={(e) => onAgreement1Change(e.target.checked)}
                className="border-sm size-20 shrink-0 rounded-xs border-black"
              />
              <p className="text-body-medium text-black">
                저작권 관련 정책을 모두 이해하고 동의합니다. [더보기]
              </p>
            </div>
            <div className="gap-md flex items-center">
              <input
                type="checkbox"
                checked={agreement2}
                onChange={(e) => onAgreement2Change(e.target.checked)}
                className="border-sm size-20 shrink-0 rounded-xs border-black"
              />
              <p className="text-body-medium text-black">
                제작물의 저작권자는 본인임을 확인합니다. [더보기]
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex w-full items-center justify-center gap-12 pt-50">
          <Button variant="subtle" className="flex-1" onClick={onPrevious}>
            이전 단계
          </Button>
          <Button variant="default" className="flex-1" onClick={onComplete}>
            완료하기
          </Button>
        </div>
      </div>
    </div>
  );
};
