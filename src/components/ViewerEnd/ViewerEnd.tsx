import { FC } from "react";
import { IconStar, IconComment } from "@/assets/icons";
import IconWithLabel from "@/components/IconWithLabel/IconWithLabel";
import { cn } from "@/utils";
import { useNavigation } from "@/hooks/useNavigation";

interface ViewerEndProps {
  authorName: string;
  authorId?: string | number;
  rating?: number;
  commentsLabel?: string;
  className?: string;
}

export const ViewerEnd: FC<ViewerEndProps> = ({
  authorName,
  authorId,
  rating,
  commentsLabel = "댓글",
  className,
}) => {
  const { navigate } = useNavigation();

  const handleAuthorClick = () => {
    if (authorId) {
      navigate(`/author/${authorId}`);
    }
  };

  return (
    <div
      className={cn(
        "px-xl flex w-770 items-center justify-between rounded-md py-20",
        className,
      )}
    >
      {/* Author */}
      <div className="flex min-w-0 flex-1 shrink-0 items-center justify-center gap-10">
        <button
          type="button"
          onClick={handleAuthorClick}
          className="flex shrink-0 cursor-pointer flex-col items-center justify-center gap-13"
        >
          <div className="bg-grayscale-g2 relative flex size-36 shrink-0 items-center justify-center rounded-full">
            <span className="text-grayscale-g5 text-xs">작가</span>
          </div>
          <p className="text-body-medium tracking-tight text-nowrap whitespace-pre text-black">
            {authorName}
          </p>
        </button>
      </div>

      {/* Separator */}
      <div className="bg-grayscale-g2 relative h-52 w-1 shrink-0" />

      {/* Rating */}
      {rating != null && (
        <>
          <div className="flex min-w-0 flex-1 shrink-0 items-center justify-center gap-10">
            <IconWithLabel
              icon={<IconStar className="size-24 text-black" />}
              label={rating.toFixed(1)}
            />
          </div>
          {/* Separator */}
          <div className="bg-grayscale-g2 relative h-52 w-1 shrink-0" />
        </>
      )}

      {/* Comments */}
      <div className="flex min-w-0 flex-1 shrink-0 items-center justify-center gap-10">
        <IconWithLabel
          icon={<IconComment className="size-24 text-black" />}
          label={commentsLabel}
        />
      </div>
    </div>
  );
};
