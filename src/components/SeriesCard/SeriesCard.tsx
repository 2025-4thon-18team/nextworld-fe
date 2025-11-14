import { FC, useCallback } from "react";
import { cn } from "@/utils";
import { Tag } from "@/components/Tag/Tag";
import { useNavigation } from "@/hooks";
import PresetImage from "@/assets/presets/preset-3.png";
interface SeriesCardProps {
  imageUrl: string;
  title: string;
  tags: string[];
  selected?: boolean;
  seriesId: string;
  onClick?: () => void;
  className?: string;
}

export const SeriesCard: FC<SeriesCardProps> = ({
  imageUrl,
  title,
  tags,
  selected = false,
  seriesId,
  onClick,
  className,
}) => {
  const { navigateToSeries } = useNavigation();
  const handleSeriesClick = useCallback(() => {
    // onClick이 있으면 우선적으로 onClick 호출 (예: Interests 페이지에서 작품 선택)
    if (onClick) {
      onClick();
    } else if (seriesId) {
      navigateToSeries(Number(seriesId));
    }
  }, [navigateToSeries, seriesId, onClick]);
  return (
    <div
      className={cn(
        "gap-sm p-sm flex w-203 flex-col items-start rounded-md select-none",
        selected && "bg-foreground-default",
        className,
      )}
      onClick={handleSeriesClick}
    >
      {/* Image */}
      <div className="relative aspect-150/225 w-full shrink-0 overflow-hidden rounded-sm">
        <picture
          className="pointer-events-none absolute inset-0 size-full rounded-sm object-cover object-center select-none"
          draggable={false}
          aria-label={title}
        >
          <source srcSet={imageUrl} type="image/png" />
          <img
            src={PresetImage}
            className="size-full rounded-sm object-cover object-center"
            draggable={false}
          />
        </picture>
      </div>

      {/* Title */}
      <p
        className={cn(
          "text-headings-heading-3 w-min-content min-w-full tracking-tight",
          selected ? "text-text-default" : "text-text-black",
        )}
      >
        {title}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="gap-xs flex items-center">
          {tags.map((tag, index) => (
            <Tag key={index} type={selected ? "default" : "muted"}>
              {tag}
            </Tag>
          ))}
        </div>
      )}
    </div>
  );
};
