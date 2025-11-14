import { FC, useState } from "react";
import { IconStar, IconComment } from "@/assets/icons";
import IconWithLabel from "@/components/IconWithLabel/IconWithLabel";
import { cn } from "@/utils";
import { useNavigation } from "@/hooks/useNavigation";
import { CommentPopup } from "@/components/CommentPopup/CommentPopup";
import { RatingPopup } from "@/components/RatingPopup/RatingPopup";

interface ViewerEndProps {
  authorName: string;
  authorId?: string | number;
  rating?: number;
  commentsLabel?: string;
  postId?: number;
  onRatingSubmit?: (rating: number) => void;
  className?: string;
}

export const ViewerEnd: FC<ViewerEndProps> = ({
  authorName,
  authorId,
  rating,
  commentsLabel = "댓글",
  postId,
  onRatingSubmit,
  className,
}) => {
  const { navigate } = useNavigation();
  const [isCommentPopupOpen, setIsCommentPopupOpen] = useState(false);
  const [isRatingPopupOpen, setIsRatingPopupOpen] = useState(false);

  const handleAuthorClick = () => {
    if (authorId) {
      navigate(`/author/${authorId}`);
    }
  };

  const handleCommentClick = () => {
    if (postId) {
      setIsCommentPopupOpen(true);
    }
  };

  const handleRatingClick = () => {
    setIsRatingPopupOpen(true);
  };

  const handleRatingSubmit = (newRating: number) => {
    if (onRatingSubmit) {
      onRatingSubmit(newRating);
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
              onClick={handleRatingClick}
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
          onClick={handleCommentClick}
        />
      </div>

      {/* Popups */}
      {postId && (
        <CommentPopup
          postId={postId}
          isOpen={isCommentPopupOpen}
          onClose={() => setIsCommentPopupOpen(false)}
        />
      )}
      <RatingPopup
        currentRating={rating}
        isOpen={isRatingPopupOpen}
        onClose={() => setIsRatingPopupOpen(false)}
        onSubmit={handleRatingSubmit}
      />
    </div>
  );
};
