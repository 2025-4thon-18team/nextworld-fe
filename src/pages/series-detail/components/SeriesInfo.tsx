import { FC } from "react";
import { cn } from "@/utils";
import {
  IconStar,
  IconEye,
  IconCircle,
  IconHeart,
  IconPlusWithCircle,
  IconShare,
} from "@/assets/icons";
import { TagList } from "@/components/TagList/TagList";

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
    <div className={cn("flex w-358 flex-col items-start gap-26", className)}>
      {/* Main Info Section */}
      <div className="gap-lg relative flex h-105 w-full shrink-0 flex-col items-start">
        {/* Category and Stats */}
        <div className="gap-md relative flex w-full shrink-0 flex-col items-start">
          <p className="text-body-medium w-full tracking-tight text-black">
            {category}
          </p>
          <div className="relative flex w-full shrink-0 items-center gap-91">
            <div className="flex shrink-0 items-center gap-18">
              {/* Rating */}
              <div className="gap-xs flex shrink-0 items-center justify-center">
                <IconStar className="size-24 shrink-0 overflow-hidden text-black" />
                <p className="text-body-medium tracking-tight text-nowrap whitespace-pre text-black">
                  {rating.toFixed(1)}
                </p>
              </div>
              {/* Views */}
              <div className="gap-xs flex shrink-0 items-center justify-center">
                <IconEye className="size-24 shrink-0 overflow-hidden text-black" />
                <p className="text-body-medium tracking-tight text-nowrap whitespace-pre text-black">
                  {views}
                </p>
              </div>
              {/* Serializing Status */}
              <div className="gap-xs flex shrink-0 items-center justify-center">
                <IconCircle className="text-foreground-muted size-24 shrink-0 overflow-hidden" />
                <p className="text-body-medium tracking-tight text-nowrap whitespace-pre text-black">
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
      <div className="relative h-0 w-full shrink-0 border-t border-black" />

      {/* Action Buttons */}
      <div className="px-sm relative flex w-full shrink-0 items-center justify-between py-0">
        <button
          type="button"
          onClick={onLike}
          className="gap-xs flex flex-col items-center justify-center px-12 py-0"
        >
          <IconHeart className="size-24 shrink-0 overflow-hidden text-black" />
          <p className="text-body-medium text-center tracking-tight text-nowrap whitespace-pre text-black">
            {likes}
          </p>
        </button>
        <button
          type="button"
          onClick={onInterest}
          className="gap-xs flex flex-col items-center justify-center px-12 py-0"
        >
          <IconPlusWithCircle className="size-24 shrink-0 text-black" />
          <p className="text-body-medium text-center tracking-tight text-nowrap whitespace-pre text-black">
            관심
          </p>
        </button>
        <button
          type="button"
          onClick={onShare}
          className="gap-xs flex flex-col items-center justify-center px-12 py-0"
        >
          <IconShare className="size-24 shrink-0 overflow-hidden text-black" />
          <p className="text-body-medium text-center tracking-tight text-nowrap whitespace-pre text-black">
            공유
          </p>
        </button>
      </div>
    </div>
  );
};
