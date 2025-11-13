import { FC } from "react";
import { cn } from "@/utils";
import { IconChevron } from "@/assets/icons";
import { useNavigation } from "@/hooks/useNavigation";

interface OriginalSeriesBannerProps {
  imageUrl: string;
  label: string;
  title: string;
  seriesId?: string | number;
  onClick?: () => void;
  className?: string;
}

export const OriginalSeriesBanner: FC<OriginalSeriesBannerProps> = ({
  imageUrl,
  label,
  title,
  seriesId,
  onClick,
  className,
}) => {
  const { navigateToSeries } = useNavigation();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (seriesId) {
      navigateToSeries(seriesId);
    }
  };

  return (
    <div
      className={cn(
        "flex w-760 items-center justify-between overflow-clip rounded-md bg-[lightgrey] p-10",
        className,
      )}
    >
      <div className="relative flex shrink-0 items-center gap-10">
        {/* Image */}
        <div className="relative h-75 w-50 shrink-0 rounded-sm">
          <img
            alt={title}
            src={imageUrl}
            className="pointer-events-none absolute inset-0 size-full rounded-sm object-cover object-center"
          />
        </div>

        {/* Text Content */}
        <div className="relative flex shrink-0 flex-col items-start justify-center gap-2 leading-normal text-nowrap whitespace-pre text-black">
          <p className="text-caption-regular relative shrink-0 tracking-tight">
            {label}
          </p>
          <p className="text-body-medium relative shrink-0 tracking-tight">
            {title}
          </p>
        </div>
      </div>

      {/* Arrow Icon */}
      <button
        type="button"
        onClick={handleClick}
        className="relative flex shrink-0 items-center justify-center"
      >
        <IconChevron className="size-24 rotate-180 overflow-hidden" />
      </button>
    </div>
  );
};
