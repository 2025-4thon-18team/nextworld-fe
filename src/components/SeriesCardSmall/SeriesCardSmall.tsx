import { FC } from "react";
import { cn } from "@/utils";

interface SeriesCardSmallProps {
  imageUrl: string;
  title: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export const SeriesCardSmall: FC<SeriesCardSmallProps> = ({
  imageUrl,
  title,
  selected = false,
  onClick,
  className,
}) => {
  return (
    <div
      className={cn(
        "gap-sm flex flex-col items-start rounded-md p-sm",
        selected && "bg-foreground-default",
        className,
      )}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-201 w-134 shrink-0 overflow-hidden rounded-sm">
        <img
          alt={title}
          src={imageUrl}
          className="pointer-events-none absolute inset-0 size-full rounded-sm object-cover object-center"
        />
      </div>

      {/* Title */}
      <p
        className={cn(
          "text-body-medium w-min-content min-w-full tracking-tight",
          selected ? "text-grayscale-white" : "text-black",
        )}
      >
        {title}
      </p>
    </div>
  );
};
