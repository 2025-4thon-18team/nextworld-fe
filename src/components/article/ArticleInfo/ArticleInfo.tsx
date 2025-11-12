import { IconComment, IconEye, IconStar } from "@/assets/icons";
import { FC } from "react";

interface ArticleInfoProps {
  rating: number;
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
  return (
    <div className="gap-lg flex flex-row items-center">
      <div className="gap-xs flex items-center">
        <IconStar className="text-grayscale-g5" />
        <span className="text-body-small-medium text-grayscale-g5">
          {rating.toFixed(1)}
        </span>
      </div>
      <div className="gap-xs flex items-center">
        <IconEye className="text-grayscale-g5" />
        <span className="text-body-small-medium text-grayscale-g5">
          {views}
        </span>
      </div>
      <div className="gap-xs flex items-center">
        <IconComment className="text-grayscale-g5" />
        <span className="text-body-small-medium text-grayscale-g5">
          {comments}
        </span>
      </div>
      <span className="text-body-small-medium text-grayscale-g5">{date}</span>
    </div>
  );
};

