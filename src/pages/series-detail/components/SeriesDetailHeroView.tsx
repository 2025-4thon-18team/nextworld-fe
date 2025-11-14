import { FC } from "react";
import { cn } from "@/utils";
import Button from "@/components/Button/Button";

interface SeriesDetailHeroViewProps {
  imageUrl: string;
  universeName: string;
  seriesName: string;
  authorName: string;
  description: string;
  onViewFirstEpisode: () => void;
  onEditWork?: () => void;
  className?: string;
}

export const SeriesDetailHeroView: FC<SeriesDetailHeroViewProps> = ({
  imageUrl,
  universeName,
  seriesName,
  authorName,
  description,
  onViewFirstEpisode,
  onEditWork,
  className,
}) => {
  return (
    <div className={cn("flex h-453 items-center", className)}>
      {/* Left: Blurred background with clear image */}
      <div className="bg-background-subtle relative h-full w-411 shrink-0 overflow-hidden rounded-tl-md">
        {/* Blurred background */}
        <div className="absolute inset-0 h-450 w-424 blur filter">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <img
              alt=""
              className="absolute size-full max-w-none object-cover object-center"
              src={imageUrl}
              draggable={false}
            />
            <div className="absolute inset-0 bg-[rgba(122,122,122,0.4)]" />
          </div>
        </div>
        {/* Clear image */}
        <div className="absolute top-1/2 left-1/2 h-300 w-200 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md">
          <img
            alt={seriesName}
            className="pointer-events-none absolute inset-0 size-full max-w-none rounded-xs object-cover object-center"
            draggable={false}
            src={imageUrl}
          />
        </div>
      </div>

      {/* Right: Series info */}
      <div className="bg-grayscale-g5 border-border-accent relative flex h-full w-full flex-col justify-between rounded-tr-md border-t-6 border-solid px-24 pt-108 pb-32">
        <div className="flex w-full flex-col items-start gap-32">
          {/* Title section */}
          <div className="text-headings-heading-5 text-grayscale-white relative flex w-full shrink-0 flex-col items-start gap-3 leading-normal">
            <p className="text-headings-heading-5 relative w-full shrink-0 tracking-tight">
              {universeName}
            </p>
            <p className="text-headings-heading-1 relative w-full shrink-0 tracking-tight">
              {seriesName}
            </p>
            <p className="text-headings-heading-5 relative w-full shrink-0 tracking-tight">
              {authorName}
            </p>
          </div>
          {/* Description */}
          <div className="relative flex w-[min-content] min-w-full shrink-0 items-center justify-center">
            <div className="w-full flex-none">
              <p className="text-body-small-medium text-grayscale-white relative w-full tracking-tight">
                {description}
              </p>
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className="gap-sm flex w-full">
          <Button variant="accent" onClick={onViewFirstEpisode}>
            첫 화 보기
          </Button>
          {onEditWork && (
            <Button variant="default" onClick={onEditWork}>
              작품 수정하기
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
