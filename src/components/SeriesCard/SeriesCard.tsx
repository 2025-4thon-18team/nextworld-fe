import { FC } from "react";
import { cn } from "@/utils";
import { Tag } from "@/components/Tag/Tag";

interface SeriesCardProps {
  imageUrl: string;
  title: string;
  tags: string[];
  className?: string;
}

export const SeriesCard: FC<SeriesCardProps> = ({
  imageUrl,
  title,
  tags,
  className,
}) => {
  return (
    <div className={cn("gap-sm flex w-203 flex-col items-start", className)}>
      {/* Image */}
      <div className="relative aspect-[150/225] w-full shrink-0 overflow-hidden rounded-sm">
        <img
          alt={title}
          src={imageUrl}
          className="pointer-events-none absolute inset-0 size-full rounded-sm object-cover object-center"
        />
      </div>

      {/* Title */}
      <p className="text-headings-heading-3 w-min-content min-w-full tracking-tight text-black">
        {title}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="gap-xs flex items-center">
          {tags.map((tag, index) => (
            <Tag key={index} type="default">
              {tag}
            </Tag>
          ))}
        </div>
      )}
    </div>
  );
};
