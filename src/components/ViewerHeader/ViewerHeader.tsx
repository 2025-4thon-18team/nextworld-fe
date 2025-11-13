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

// IconChevronFlip - 뒤집힌 Chevron 아이콘
const IconChevronFlip = ({ className }: { className?: string }) => {
  return (
    <div className={cn("size-24 overflow-hidden shrink-0 flex items-center justify-center", className)}>
      <IconChevron className="size-24 rotate-180 scale-y-[-100%]" />
    </div>
  );
};

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
            <div className="flex flex-col gap-xs items-start justify-between text-black h-56 shrink-0 w-161">
              {seriesTitle && (
                <p className="text-body-medium tracking-tight w-full">{seriesTitle}</p>
              )}
              <p className="text-headings-heading-2 tracking-tight w-full">
                {episodeTitle}
              </p>
            </div>
          </div>
          <div className="gap-sm flex items-center shrink-0">
            <IconWithLabel
              icon={<IconChevron className="size-24 overflow-hidden shrink-0" />}
              label="저번화"
              onClick={onPrevious}
            />
            <IconWithLabel
              icon={<IconChevronFlip />}
              label="다음화"
              onClick={onNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

