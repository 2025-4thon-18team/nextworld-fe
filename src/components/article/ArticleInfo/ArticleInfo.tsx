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
    <div className="gap-lg relative flex shrink-0 items-center">
      <div className="gap-xs relative flex shrink-0 items-center">
        <div className="relative size-24 shrink-0">
          <IconStar className="size-24" />
        </div>
        <p className="text-body-small-medium text-text-muted tracking-tight text-nowrap whitespace-pre">
          {displayRating.toFixed(1)}
        </p>
      </div>
      <div className="gap-xs relative flex shrink-0 items-center">
        <div className="relative size-24 shrink-0 overflow-hidden">
          <IconEye className="size-24" />
        </div>
        <p className="text-body-small-medium text-text-muted tracking-tight text-nowrap whitespace-pre">
          {views}
        </p>
      </div>
      <div className="gap-xs relative flex shrink-0 items-center">
        <div className="relative size-24 shrink-0 overflow-hidden">
          <IconComment className="size-24" />
        </div>
        <p className="text-body-small-medium text-text-muted tracking-tight text-nowrap whitespace-pre">
          {comments}
        </p>
      </div>
      <p className="text-body-small-medium text-text-muted tracking-tight text-nowrap whitespace-pre">
        {new Date(date).toLocaleDateString("ko-KR", {
          year: "2-digit",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  );
};
