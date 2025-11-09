import { FC } from "react";
import { cn } from "@/utils";

interface SeriesCardSmallProps {
  imageUrl: string;
  title: string;
  className?: string;
}

export const SeriesCardSmall: FC<SeriesCardSmallProps> = ({
  imageUrl,
  title,
  className,
}) => {
  return (
    <div className={cn("gap-xs flex flex-col items-start", className)}>
      {/* Image */}
      <div className="relative h-225 w-150 shrink-0 overflow-hidden rounded-sm">
        <img
          alt={title}
          src={imageUrl}
          className="pointer-events-none absolute inset-0 size-full rounded-sm object-cover object-center"
        />
      </div>

      {/* Title */}
      <p className="text-body-medium w-min-content min-w-full tracking-tight text-black">
        {title}
      </p>
    </div>
  );
};
