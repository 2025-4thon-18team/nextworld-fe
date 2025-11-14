import { IconComment, IconEye, IconStar } from "@/assets/icons";
import { FC } from "react";

interface ArticleInfoProps {
  rating: number | null;
  views: number;
  comments: number;
  date: string;
}

export const ArticleInfo: FC<ArticleInfoProps> = ({
  rating,
  views,
  comments,
  date,
}) => {
  const displayRating = rating != null ? rating : 0;
  return (
    <div className="gap-lg flex items-center relative shrink-0">
      <div className="gap-xs flex items-center relative shrink-0">
        <div className="relative shrink-0 size-24">
          <IconStar className="size-24" />
        </div>
        <p className="text-body-small-medium text-muted text-nowrap tracking-tight whitespace-pre">
          {displayRating.toFixed(1)}
        </p>
      </div>
      <div className="gap-xs flex items-center relative shrink-0">
        <div className="overflow-hidden relative shrink-0 size-24">
          <IconEye className="size-24" />
        </div>
        <p className="text-body-small-medium text-muted text-nowrap tracking-tight whitespace-pre">
          {views}
        </p>
      </div>
      <div className="gap-xs flex items-center relative shrink-0">
        <div className="overflow-hidden relative shrink-0 size-24">
          <IconComment className="size-24" />
        </div>
        <p className="text-body-small-medium text-muted text-nowrap tracking-tight whitespace-pre">
          {comments}
        </p>
      </div>
      <p className="text-body-small-medium text-muted text-nowrap tracking-tight whitespace-pre">
        {date}
      </p>
    </div>
  );
};

