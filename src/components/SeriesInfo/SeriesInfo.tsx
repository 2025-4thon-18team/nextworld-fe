import { FC } from "react";
import { cn } from "@/utils";
import { IconStar, IconEye, IconCircle, IconHeart, IconPlusWithCircle, IconShare } from "@/assets/icons";
import { TagList } from "@/components/TagList/TagList";
import IconWithLabel from "@/components/IconWithLabel/IconWithLabel";

interface SeriesInfoProps {
  category: string;
  rating: number;
  views: number;
  isSerializing: boolean;
  tags: string[];
  likes: number;
  onLike?: () => void;
  onInterest?: () => void;
  onShare?: () => void;
  className?: string;
}

export const SeriesInfo: FC<SeriesInfoProps> = ({
  category,
  rating,
  views,
  isSerializing,
  tags,
  likes,
  onLike,
  onInterest,
  onShare,
  className,
}) => {
  return (
    <div className={cn("gap-26 flex w-358 flex-col items-start", className)}>
      {/* Main Info Section */}
      <div className="gap-lg flex h-105 flex-col items-start relative shrink-0 w-full">
        {/* Category and Stats */}
        <div className="gap-md flex flex-col items-start relative shrink-0 w-full">
          <p className="text-body-medium text-black tracking-tight w-full">
            {category}
          </p>
          <div className="gap-91 flex items-center relative shrink-0 w-full">
            <div className="gap-18 flex items-center shrink-0">
              {/* Rating */}
              <div className="gap-xs flex items-center justify-center shrink-0">
                <IconStar className="size-24 overflow-hidden shrink-0 text-black" />
                <p className="text-body-medium text-black text-nowrap tracking-tight whitespace-pre">
                  {rating.toFixed(1)}
                </p>
              </div>
              {/* Views */}
              <div className="gap-xs flex items-center justify-center shrink-0">
                <IconEye className="size-24 overflow-hidden shrink-0 text-black" />
                <p className="text-body-medium text-black text-nowrap tracking-tight whitespace-pre">
                  {views}
                </p>
              </div>
              {/* Serializing Status */}
              <div className="gap-xs flex items-center justify-center shrink-0">
                <IconCircle className="size-24 overflow-hidden shrink-0 text-foreground-muted" />
                <p className="text-body-medium text-black text-nowrap tracking-tight whitespace-pre">
                  {isSerializing ? "연재 중" : "완결"}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Tags */}
        <TagList tags={tags} />
      </div>

      {/* Separator */}
      <div className="h-0 relative shrink-0 w-full border-t border-black" />

      {/* Action Buttons */}
      <div className="px-sm py-0 flex items-center justify-between relative shrink-0 w-full">
        <button
          type="button"
          onClick={onLike}
          className="flex flex-col gap-xs items-center justify-center px-12 py-0"
        >
          <IconHeart className="size-24 overflow-hidden shrink-0 text-black" />
          <p className="text-body-medium text-black text-center text-nowrap tracking-tight whitespace-pre">
            {likes}
          </p>
        </button>
        <button
          type="button"
          onClick={onInterest}
          className="flex flex-col gap-xs items-center justify-center px-12 py-0"
        >
          <IconPlusWithCircle className="size-24 shrink-0 text-black" />
          <p className="text-body-medium text-black text-center text-nowrap tracking-tight whitespace-pre">
            관심
          </p>
        </button>
        <button
          type="button"
          onClick={onShare}
          className="flex flex-col gap-xs items-center justify-center px-12 py-0"
        >
          <IconShare className="size-24 overflow-hidden shrink-0 text-black" />
          <p className="text-body-medium text-black text-center text-nowrap tracking-tight whitespace-pre">
            공유
          </p>
        </button>
      </div>
    </div>
  );
};

