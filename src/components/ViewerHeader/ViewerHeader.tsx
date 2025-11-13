import { FC } from "react";
import { IconChevron } from "@/assets/icons";
import IconWithLabel from "@/components/IconWithLabel/IconWithLabel";
import { cn } from "@/utils";
import { useNavigation } from "@/hooks/useNavigation";

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
    <div
      className={cn(
        "flex size-24 shrink-0 items-center justify-center overflow-hidden",
        className,
      )}
    >
      <IconChevron className="size-24 -scale-y-100 rotate-180" />
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
  const { navigateBack } = useNavigation();

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    } else {
      navigateBack();
    }
  };

  return (
    <div
      className={cn(
        "border-b-md border-grayscale-g2 h-100 w-1440 border-t-0 border-r-0 border-l-0 border-solid bg-white",
        className,
      )}
    >
      <div className="relative h-100 w-1440">
        <div className="absolute top-19 left-[calc(10%+66px)] flex w-1035 items-center justify-between">
          <div className="gap-xl flex shrink-0 items-center">
            {/* Previous Episode Button */}
            <button
              type="button"
              onClick={handlePrevious}
              className="flex size-24 cursor-pointer items-center justify-center overflow-hidden"
            >
              <IconChevron className="size-24 shrink-0 overflow-hidden" />
            </button>
            <div className="gap-xs flex h-56 w-161 shrink-0 flex-col items-start justify-between text-black">
              {seriesTitle && (
                <p className="text-body-medium w-full tracking-tight">
                  {seriesTitle}
                </p>
              )}
              <p className="text-headings-heading-2 w-full tracking-tight">
                {episodeTitle}
              </p>
            </div>
          </div>
          {onNext && (
            <div className="gap-sm flex shrink-0 items-center">
              <IconWithLabel
                icon={
                  <IconChevron className="size-24 shrink-0 overflow-hidden" />
                }
                label="저번화"
                onClick={onPrevious}
              />
              <IconWithLabel
                icon={<IconChevronFlip />}
                label="다음화"
                onClick={onNext}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
