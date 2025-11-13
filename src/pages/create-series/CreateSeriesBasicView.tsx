import { FC } from "react";
import {
  InputLabel,
  TextInput,
  TextArea,
  TagsInput,
} from "@/components/Input/Input";
import { Tag } from "@/components/Tag/Tag";
import { IconChevron } from "@/assets/icons";
import Button from "@/components/Button/Button";
import { cn } from "@/utils";

type StepType = "기본 설정" | "유니버스 설정" | "2차 창작 설정";

type Props = {
  activeStep: StepType;
  coverImageUrl?: string;
  title: string;
  description: string;
  serialDays: string[];
  genres: string[];
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  onStepChange: (step: StepType) => void;
  onCoverImageClick: () => void;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSerialDayToggle: (day: string) => void;
  onGenreToggle: (genre: string) => void;
  onNext: () => void;
};

export const CreateSeriesBasicView: FC<Props> = ({
  activeStep,
  coverImageUrl,
  title,
  description,
  serialDays,
  genres,
  tags,
  onTagsChange,
  onStepChange,
  onCoverImageClick,
  onTitleChange,
  onDescriptionChange,
  onSerialDayToggle,
  onGenreToggle,
  onNext,
}) => {
  const weekDays = ["월", "화", "수", "목", "금", "토", "일"];
  const genreOptions = ["현대로맨스", "현대로맨스", "스릴러"];

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

        {/* Cover Image Section */}
        <div className="gap-sm flex w-810 flex-col items-start">
          <InputLabel required>표지 이미지</InputLabel>
          <div className="gap-xl flex items-center">
            {/* Cover Image Preview */}
            <div className="h-253 w-162 shrink-0">
              <button
                type="button"
                onClick={onCoverImageClick}
                className="bg-grayscale-g2 h-full w-full"
              >
                {coverImageUrl ? (
                  <img
                    src={coverImageUrl}
                    alt="Cover"
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </button>
            </div>

            {/* Presets and File Upload */}
            <div className="gap-xl flex flex-col items-start">
              {/* Presets */}
              <div className="gap-lg flex items-center">
                {[1, 2, 3, 4].map((index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={onCoverImageClick}
                    className="bg-grayscale-g2 flex h-171 w-110 flex-col items-center justify-center gap-10 rounded-md px-22 py-60"
                  >
                    <p className="text-body-medium whitespace-nowrap text-black">
                      프리셋
                    </p>
                  </button>
                ))}
              </div>

              {/* File Upload */}
              <div className="relative h-46 w-588">
                <input
                  type="file"
                  accept="image/*"
                  onChange={onCoverImageClick}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
                <div className="border-grayscale-g3 px-md flex h-full w-full items-center rounded-md border">
                  <p className="text-body-medium text-muted px-md">
                    파일을 선택해주세요.
                  </p>
                  <div className="ml-auto flex h-full items-center justify-center">
                    <IconChevron className="size-46 rotate-90" />
                  </div>
                  <p className="text-body-medium text-muted absolute top-1/2 right-25 -translate-y-1/2">
                    파일 선택
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="gap-xl flex w-810 flex-col items-start">
          {/* Title */}
          <div className="gap-sm flex w-full flex-col items-start">
            <InputLabel required>제목</InputLabel>
            <TextInput
              placeholder="placeholder"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="gap-sm flex w-full flex-col items-start">
            <InputLabel required>작품 설명</InputLabel>
            <TextArea
              placeholder="placeholder"
              className="h-140"
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
            />
          </div>

          {/* Serial Days */}
          <div className="gap-sm flex w-full flex-col items-start">
            <InputLabel required>연재일</InputLabel>
            <div className="px-md flex flex-col gap-10 py-0">
              <div className="gap-xs flex items-center">
                {weekDays.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => onSerialDayToggle(day)}
                  >
                    <Tag type={serialDays.includes(day) ? "default" : "muted"}>
                      {day}
                    </Tag>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => onSerialDayToggle("자유연재")}
                >
                  <Tag
                    type={serialDays.includes("자유연재") ? "default" : "muted"}
                  >
                    자유연재
                  </Tag>
                </button>
              </div>
            </div>
          </div>

          {/* Genres */}
          <div className="gap-sm flex w-full flex-col items-start">
            <InputLabel required>장르 카테고리</InputLabel>
            <div className="px-md flex flex-col gap-10 py-0">
              <div className="gap-xs flex items-center">
                {genreOptions.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => onGenreToggle(genre)}
                  >
                    <Tag type={genres.includes(genre) ? "default" : "muted"}>
                      {genre}
                    </Tag>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="gap-sm flex w-full flex-col items-start">
            <InputLabel>태그</InputLabel>
            <TagsInput tags={tags} onTagsChange={onTagsChange} />
          </div>
        </div>

        {/* Next Button */}
        <div className="flex w-full items-center justify-center gap-12 pt-50">
          <div className="h-48 w-401 shrink-0" />
          <Button variant="default" className="flex-1" onClick={onNext}>
            다음 단계
          </Button>
        </div>
      </div>
    </div>
  );
};
