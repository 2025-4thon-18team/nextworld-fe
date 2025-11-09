import { FC } from "react";
import { IconChevron } from "@/assets/icons";
import IconWithLabel from "@/components/IconWithLabel/IconWithLabel";
import { cn } from "@/utils";

interface ViewerHeaderProps {
  seriesTitle?: string;
  episodeTitle: string;
  onPrevious?: () => void;
  onNext?: () => void;
  className?: string;
}

export const ViewerHeader: FC<ViewerHeaderProps> = ({
  seriesTitle,
  episodeTitle,
  onPrevious,
  onNext,
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-white border-b-md border-grayscale-g2 border-l-0 border-r-0 border-t-0 border-solid h-100 w-1440",
        className,
      )}
    >
      <div className="h-100 relative w-1440">
        <div className="absolute flex items-center justify-between left-[calc(10%+66px)] top-19 w-1035">
          <div className="gap-xl flex items-center shrink-0">
            <button
              type="button"
              onClick={onPrevious}
              className="flex size-24 items-center justify-center overflow-hidden"
            >
              <IconChevron className="size-24 overflow-hidden shrink-0" />
            </button>
            <div className="flex flex-col gap-xs items-start text-black w-161 shrink-0">
              {seriesTitle && (
                <p className="text-body-medium tracking-tight w-full">{seriesTitle}</p>
              )}
              <p className="text-headings-heading-1 tracking-tight w-full">
                {episodeTitle}
              </p>
            </div>
          </div>
          <div className="gap-sm flex items-center shrink-0">
            <button
              type="button"
              onClick={onPrevious}
              className="flex flex-col gap-xs items-center justify-center px-12 py-0"
            >
              <IconChevron className="size-24 overflow-hidden shrink-0" />
              <p className="text-body-medium text-black text-center text-nowrap tracking-tight whitespace-pre">
                저번화
              </p>
            </button>
            <button
              type="button"
              onClick={onNext}
              className="flex flex-col gap-xs items-center justify-center px-12 py-0"
            >
              <div className="size-24 overflow-hidden shrink-0 flex items-center justify-center">
                <IconChevron className="size-24 rotate-180" />
              </div>
              <p className="text-body-medium text-black text-center text-nowrap tracking-tight whitespace-pre">
                다음화
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

