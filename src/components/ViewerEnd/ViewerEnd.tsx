import { FC } from "react";
import { IconStar, IconComment } from "@/assets/icons";
import IconWithLabel from "@/components/IconWithLabel/IconWithLabel";
import { cn } from "@/utils";

interface ViewerEndProps {
  authorName: string;
  rating?: number;
  commentsLabel?: string;
  className?: string;
}

export const ViewerEnd: FC<ViewerEndProps> = ({
  authorName,
  rating,
  commentsLabel = "댓글",
  className,
}) => {
  return (
    <div
      className={cn(
        "px-xl py-20 flex items-center justify-between rounded-md w-770",
        className,
      )}
    >
      {/* Author */}
      <div className="flex-1 flex gap-10 items-center justify-center min-w-0 shrink-0">
        <div className="flex flex-col gap-13 items-center justify-center shrink-0">
          <div className="relative size-36 shrink-0 rounded-full bg-grayscale-g2 flex items-center justify-center">
            <span className="text-xs text-grayscale-g5">작가</span>
          </div>
          <p className="text-body-medium text-black text-nowrap tracking-tight whitespace-pre">
            {authorName}
          </p>
        </div>
      </div>

      {/* Separator */}
      <div className="h-52 relative shrink-0 w-1 bg-grayscale-g2" />

      {/* Rating */}
      {rating !== undefined && (
        <>
          <div className="flex-1 flex gap-10 items-center justify-center min-w-0 shrink-0">
            <IconWithLabel
              icon={<IconStar className="size-24 text-black" />}
              label={rating.toFixed(1)}
            />
          </div>
          {/* Separator */}
          <div className="h-52 relative shrink-0 w-1 bg-grayscale-g2" />
        </>
      )}

      {/* Comments */}
      <div className="flex-1 flex gap-10 items-center justify-center min-w-0 shrink-0">
        <IconWithLabel
          icon={<IconComment className="size-24 text-black" />}
          label={commentsLabel}
        />
      </div>
    </div>
  );
};

