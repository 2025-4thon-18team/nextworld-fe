import { FC } from "react";
import { cn } from "@/utils";
import { IconChevron } from "@/assets/icons";

interface OriginalSeriesBannerProps {
  imageUrl: string;
  label: string;
  title: string;
  onClick?: () => void;
  className?: string;
}

export const OriginalSeriesBanner: FC<OriginalSeriesBannerProps> = ({
  imageUrl,
  label,
  title,
  onClick,
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-[lightgrey] flex items-center justify-between overflow-clip p-10 rounded-md w-760",
        className,
      )}
    >
      <div className="flex gap-10 items-center relative shrink-0">
        {/* Image */}
        <div className="relative h-75 rounded-sm shrink-0 w-50">
          <img
            alt={title}
            src={imageUrl}
            className="pointer-events-none absolute inset-0 size-full rounded-sm object-cover object-center"
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-2 items-start justify-center leading-normal relative shrink-0 text-black text-nowrap whitespace-pre">
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
        onClick={onClick}
        className="flex items-center justify-center relative shrink-0"
      >
        <IconChevron className="size-24 overflow-hidden rotate-180" />
      </button>
    </div>
  );
};

