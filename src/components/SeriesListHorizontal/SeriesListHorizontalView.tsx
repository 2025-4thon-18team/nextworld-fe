import { FC } from "react";
import { cn } from "@/utils";
import { TagList } from "@/components/TagList/TagList";

type SeriesItem = {
  id: string;
  imageUrl: string;
  title: string;
  tags: string[];
};

type Props = {
  className?: string;
  items: SeriesItem[];
  onItemClick?: (id: string) => void;
};

export const SeriesListHorizontalView: FC<Props> = ({
  className,
  items,
  onItemClick,
}) => {
  return (
    <div className={cn("gap-sm flex items-center", className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            "gap-sm p-sm flex flex-col items-start rounded-md shrink-0 w-203",
            onItemClick && "cursor-pointer",
          )}
          onClick={() => onItemClick?.(item.id)}
        >
          {/* Image */}
          <div className="relative aspect-150/225 w-full shrink-0 overflow-hidden rounded-sm">
            <img
              alt={item.title}
              src={item.imageUrl}
              className="pointer-events-none absolute inset-0 size-full rounded-sm object-cover object-center"
            />
          </div>

          {/* Title */}
          <p className="text-headings-heading-3 tracking-tight min-w-full relative shrink-0 text-black w-min-content">
            {item.title}
          </p>

          {/* Tags */}
          <TagList tags={item.tags} className="flex items-center relative shrink-0" />
        </div>
      ))}
    </div>
  );
};

